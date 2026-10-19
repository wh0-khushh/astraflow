import { Component, OnInit } from '@angular/core';

import {
  TimeRange,
  TrafficFlowPoint,
  TrafficSummary,
  VehicleMixSlice,
  VehicleDetection,
  TrafficEvent,
  ZoneStat
} from '../../core/models/traffic.models';

import { TrafficDataService } from '../../core/services/traffic-data.service';

interface DashboardMetric {
  label: string;
  value: string;
  unit?: string;
  description: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  /* Chart canvas geometry (SVG viewBox units). */
  private readonly chartWidth = 455;
  private readonly chartHeight = 180;

  currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric'
  });

  ranges: TimeRange[] = ['1H', '6H', '24H', '7D'];

  selectedRange: TimeRange = '24H';

  loading = true;

  summary: TrafficSummary | null = null;

  metrics: DashboardMetric[] = [];

  flowSeries: TrafficFlowPoint[] = [];

  flowPoints = '';
  speedPoints = '';
  flowArea = '';
  flowAxisMax = 100;
  flowAxisLabels: string[] = ['100', '75', '50', '25', '0'];
  xAxisLabels: string[] = [];

  donutBackground = '';
  statusBreakdown: { label: string; cssClass: string; percent: number }[] = [];

  mapZoom = 1;

  zoomMap(delta: number): void {
    this.mapZoom = Math.min(2, Math.max(0.75, this.mapZoom + delta));
  }

  resetMap(): void {
    this.mapZoom = 1;
  }

  constructor(
    private trafficData: TrafficDataService
  ) {}

  ngOnInit(): void {

    this.trafficData.getSummary().subscribe(summary => {
      this.summary = summary;
      this.loading = false;
      this.buildDonut(summary.zones);
      this.buildMetrics(summary);
    });

    this.setRange(this.selectedRange);
  }

  private buildMetrics(summary: TrafficSummary): void {

    this.metrics = [
      {
        label: 'Total Vehicles',
        value: String(summary.totalVehicles),
        description: 'Detected across monitored zones'
      },
      {
        label: 'Average Speed',
        value: String(summary.avgSpeed),
        unit: 'km/h',
        description: 'Across active road segments'
      },
      {
        label: 'Open Alerts',
        value: String(summary.openAlerts),
        description: 'Violations awaiting review'
      },
      {
        label: 'Active Cameras',
        value: `${summary.activeCameras}/${summary.totalCameras}`,
        description: `${summary.zoneCount} zones monitored`
      }
    ];
  }

  setRange(range: TimeRange): void {

    this.selectedRange = range;

    this.trafficData.getFlowSeries(range).subscribe(series => {
      this.flowSeries = series;
      this.buildChart(series);
    });
  }

  /* ---------- chart geometry ---------- */

  private buildChart(series: TrafficFlowPoint[]): void {

    if (!series.length) {
      return;
    }

    const step = this.chartWidth / (series.length - 1);
    const flowMax = Math.ceil(Math.max(...series.map(p => p.flow)) / 50) * 50;
    const speedMax = Math.max(...series.map(p => p.speed)) * 1.15;

    this.flowAxisMax = flowMax;
    this.flowAxisLabels = [1, 0.75, 0.5, 0.25, 0]
      .map(f => String(Math.round(flowMax * f)));

    const toPoint = (value: number, max: number, i: number): string => {
      const x = Math.round(i * step);
      const y = Math.round(this.chartHeight - 12 - (value / max) * (this.chartHeight - 24));
      return `${x},${y}`;
    };

    const flowPts = series.map((p, i) => toPoint(p.flow, flowMax, i));
    const speedPts = series.map((p, i) => toPoint(p.speed, speedMax, i));

    this.flowPoints = flowPts.join(' ');
    this.speedPoints = speedPts.join(' ');
    this.flowArea = `${flowPts.join(' ')} ${this.chartWidth},${this.chartHeight} 0,${this.chartHeight}`;

    const labelStep = Math.max(1, Math.ceil(series.length / 7));
    this.xAxisLabels = series
      .filter((_, i) => i % labelStep === 0)
      .map(p => p.label);
  }

  private buildDonut(zones: ZoneStat[]): void {

    const total = zones.length || 1;
    const pct = (status: ZoneStat['status']): number =>
      Math.round(
        (zones.filter(z => z.status === status).length / total) * 100
      );

    const normal = pct('normal');
    const moderate = pct('moderate');
    const congested = 100 - normal - moderate;

    this.statusBreakdown = [
      { label: 'Normal', cssClass: 'status-green', percent: normal },
      { label: 'Moderate', cssClass: 'status-yellow', percent: moderate },
      { label: 'Congested', cssClass: 'status-red', percent: congested }
    ];

    this.donutBackground =
      `conic-gradient(#24d995 0% ${normal}%, ` +
      `#f6b83f ${normal}% ${normal + moderate}%, ` +
      `#ff5574 ${normal + moderate}% 100%)`;
  }

  /* ---------- helpers ---------- */

  get donutCenterLabel(): string {
    return this.statusBreakdown.length
      ? `${this.statusBreakdown[0].percent}%`
      : '—';
  }

  getEventIcon(event: TrafficEvent): string {

    const type = event.type.toLowerCase();

    if (type.includes('speed')) return 'speed';
    if (type.includes('wrong-way')) return 'wrong-way';
    if (type.includes('camera')) return 'camera';
    if (type.includes('congestion')) return 'congestion';
    return 'vehicle';
  }

  getSeverityLabel(severity: TrafficEvent['severity']): string {

    switch (severity) {
      case 'critical': return 'Attention';
      case 'warning': return 'Review';
      default: return 'Normal';
    }
  }

  detectionLabel(detection: VehicleDetection): string {
    return detection.category.toUpperCase();
  }

  trackByMetric(index: number, item: DashboardMetric): string {
    return item.label;
  }

  trackByLabel(index: number, item: VehicleMixSlice): string {
    return item.label;
  }

  trackByEvent(index: number, item: TrafficEvent): string {
    return item.type + item.time;
  }

  trackByDetection(index: number, item: VehicleDetection): string {
    return item.trackingId;
  }
}
