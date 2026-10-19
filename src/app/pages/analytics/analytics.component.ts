import { Component, OnInit } from '@angular/core';

import {
  TimeRange,
  TrafficFlowPoint,
  TrafficSummary,
  ZoneStat
} from '../../core/models/traffic.models';

import { TrafficDataService } from '../../core/services/traffic-data.service';

interface KpiMetric {
  label: string;
  value: string;
  unit?: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  comparison: string;
  icon: 'vehicles' | 'speed' | 'duration' | 'alerts';
  accent: 'blue' | 'violet' | 'cyan' | 'red';
}

/* Chart canvas geometry (matches the SVG viewBoxes in the template). */
const VOLUME_WIDTH = 760;
const VOLUME_HEIGHT = 260;
const VOLUME_TOP_PAD = 24;

const SPEED_WIDTH = 650;
const SPEED_HEIGHT = 210;
const SPEED_TOP_PAD = 16;
const SPEED_AXIS_MAX = 80;
const SPEED_TARGET = 50;

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  currentDate = '';

  ranges: TimeRange[] = ['1H', '6H', '24H', '7D'];

  selectedRange: TimeRange = '24H';

  zoneStatusFilter = 'all';

  summary: TrafficSummary | null = null;

  kpiMetrics: KpiMetric[] = [];

  filteredZones: ZoneStat[] = [];

  readonly statusLabels: { [key: string]: string } = {
    normal: 'Normal',
    moderate: 'Moderate',
    congested: 'Congested'
  };

  private flowSeries: TrafficFlowPoint[] = [];

  volumePoints = '';
  volumeArea = '';
  flowAxisLabels: string[] = [];
  volumeXLabels: string[] = [];

  speedPoints = '';
  speedTargetY = 0;
  speedAxisLabels: string[] = [];

  donutBackground = '';
  peakFlow = 0;
  peakLabel = '—';
  peakBarWidth = 0;
  efficiencyPercent = 0;

  constructor(
    private trafficData: TrafficDataService
  ) {}

  ngOnInit(): void {

    this.currentDate = new Date().toLocaleDateString(
      'en-GB',
      { day: '2-digit', month: 'short', year: 'numeric' }
    );

    this.trafficData.getSummary().subscribe(
      summary => {
        this.summary = summary;
        this.buildDonut(summary);
        this.buildEfficiency(summary);
        this.buildKpis();
        this.applyZoneFilter();
      }
    );

    this.setRange(this.selectedRange);
  }

  setRange(range: TimeRange): void {
    this.selectedRange = range;

    this.trafficData.getFlowSeries(range).subscribe(
      series => {
        this.flowSeries = series;
        this.buildVolumeChart();
        this.buildSpeedChart();
        this.buildPeak();
        this.buildKpis();
      }
    );
  }

  setZoneFilter(status: string): void {
    this.zoneStatusFilter = status;
    this.applyZoneFilter();
  }

  private buildKpis(): void {

    const summary = this.summary;

    if (!summary) {
      this.kpiMetrics = [];
      return;
    }

    const flowChange = this.seriesChange(this.flowSeries.map(p => p.flow));
    const speedChange = this.seriesChange(this.flowSeries.map(p => p.speed));

    this.kpiMetrics = [
      {
        label: 'Total Vehicles',
        value: String(summary.totalVehicles),
        change: flowChange.label,
        trend: flowChange.trend,
        comparison: 'later half vs earlier half of series',
        icon: 'vehicles',
        accent: 'blue'
      },
      {
        label: 'Average Speed',
        value: String(summary.avgSpeed),
        unit: 'km/h',
        change: speedChange.label,
        trend: speedChange.trend,
        comparison: 'later half vs earlier half of series',
        icon: 'speed',
        accent: 'violet'
      },
      {
        label: 'Open Alerts',
        value: String(summary.openAlerts),
        change: 'awaiting review',
        trend: 'neutral',
        comparison: 'sample violation records',
        icon: 'alerts',
        accent: 'red'
      },
      {
        label: 'Active Cameras',
        value: `${summary.activeCameras}/${summary.totalCameras}`,
        change: `${summary.zoneCount} zones`,
        trend: 'neutral',
        comparison: 'monitored in sample network',
        icon: 'duration',
        accent: 'cyan'
      }
    ];
  }

  private applyZoneFilter(): void {

    if (!this.summary) {
      this.filteredZones = [];
      return;
    }

    this.filteredZones = this.zoneStatusFilter === 'all'
      ? this.summary.zones
      : this.summary.zones.filter(
          zone => zone.status === this.zoneStatusFilter
        );
  }

  get efficiencyLabel(): string {

    if (this.efficiencyPercent >= 90) {
      return 'Excellent';
    }

    if (this.efficiencyPercent >= 75) {
      return 'Good';
    }

    return 'Below target';
  }

  exportReport(): void {
    /* CSV/PDF export requires real data from the backend. */
    window.alert(
      'Export requires the Python backend API, which is not connected yet.'
    );
  }

  trackByRange(index: number, range: TimeRange): string {
    return range;
  }

  trackByMetric(index: number, metric: KpiMetric): string {
    return metric.label;
  }

  trackByZone(index: number, zone: ZoneStat): string {
    return zone.cameraId;
  }

  /* ------------------------------------------------------ */

  private axisMax(values: number[]): number {
    const max = Math.max(...values, 1);
    return Math.ceil(max / 100) * 100;
  }

  private buildVolumeChart(): void {

    const series = this.flowSeries;

    if (!series.length) {
      this.volumePoints = '';
      this.volumeArea = '';
      return;
    }

    const max = this.axisMax(series.map(p => p.flow));
    const stepX = VOLUME_WIDTH / (series.length - 1);

    const points = series.map((point, index) => {
      const x = index * stepX;
      const y = VOLUME_HEIGHT - (point.flow / max) * (VOLUME_HEIGHT - VOLUME_TOP_PAD);
      return `${round(x)},${round(y)}`;
    });

    this.volumePoints = points.join(' ');

    this.volumeArea =
      `0,${VOLUME_HEIGHT} ` +
      points.join(' ') +
      ` ${VOLUME_WIDTH},${VOLUME_HEIGHT}`;

    this.flowAxisLabels = [0, 1, 2, 3, 4].map(
      i => String(Math.round(max * (4 - i) / 4))
    );

    const labelStep = Math.max(1, Math.ceil(series.length / 6));

    this.volumeXLabels = series
      .filter((_, index) => index % labelStep === 0)
      .map(point => point.label);
  }

  private buildSpeedChart(): void {

    const series = this.flowSeries;

    if (!series.length) {
      this.speedPoints = '';
      return;
    }

    const stepX = SPEED_WIDTH / (series.length - 1);

    this.speedPoints = series.map((point, index) => {
      const x = index * stepX;
      const y = SPEED_HEIGHT -
        (point.speed / SPEED_AXIS_MAX) * (SPEED_HEIGHT - SPEED_TOP_PAD);
      return `${round(x)},${round(y)}`;
    }).join(' ');

    this.speedTargetY = round(
      SPEED_HEIGHT - (SPEED_TARGET / SPEED_AXIS_MAX) * (SPEED_HEIGHT - SPEED_TOP_PAD)
    );

    this.speedAxisLabels = [0, 1, 2, 3, 4].map(
      i => String(Math.round(SPEED_AXIS_MAX * (4 - i) / 4))
    );
  }

  private buildPeak(): void {

    if (!this.flowSeries.length) {
      return;
    }

    const peak = this.flowSeries.reduce(
      (best, point) => point.flow > best.flow ? point : best,
      this.flowSeries[0]
    );

    this.peakFlow = peak.flow;
    this.peakLabel = peak.label;
    this.peakBarWidth = round((peak.flow / this.axisMax(
      this.flowSeries.map(p => p.flow)
    )) * 100);
  }

  private buildDonut(summary: TrafficSummary): void {

    const colors: { [key: string]: string } = {
      blue: '#2688ff',
      amber: '#f2a93b',
      violet: '#8b5cf6',
      red: '#ef4444',
      slate: '#64748b'
    };

    let cursor = 0;

    const stops = summary.vehicleMix.map(slice => {
      const from = cursor;
      cursor += slice.percentage;
      return `${colors[slice.accent]} ${from}% ${cursor}%`;
    });

    this.donutBackground = `conic-gradient(${stops.join(', ')})`;
  }

  private buildEfficiency(summary: TrafficSummary): void {
    this.efficiencyPercent = Math.min(
      100,
      Math.round((summary.avgSpeed / SPEED_TARGET) * 100)
    );
  }

  private seriesChange(values: number[]): { label: string; trend: 'up' | 'down' | 'neutral' } {

    if (values.length < 2) {
      return { label: '—', trend: 'neutral' };
    }

    const half = Math.floor(values.length / 2);

    const first = values.slice(0, half).reduce((sum, v) => sum + v, 0) / half;
    const second = values.slice(half)
      .reduce((sum, v) => sum + v, 0) / (values.length - half);

    if (first === 0) {
      return { label: '—', trend: 'neutral' };
    }

    const delta = ((second - first) / first) * 100;

    return {
      label: `${delta >= 0 ? '+' : ''}${round(delta)}%`,
      trend: Math.abs(delta) < 0.5 ? 'neutral' : delta > 0 ? 'up' : 'down'
    };
  }
}

function round(value: number): number {
  return Math.round(value * 10) / 10;
}
