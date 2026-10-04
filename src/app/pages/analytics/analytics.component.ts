import { Component } from '@angular/core';

interface KpiMetric {
  label: string;
  value: string;
  unit?: string;
  change: string;
  trend: 'up' | 'down';
  icon: 'vehicles' | 'speed' | 'duration' | 'alerts';
  accent: 'blue' | 'violet' | 'cyan' | 'red';
}

interface VehicleDistribution {
  label: string;
  count: number;
  percentage: number;
  accent: string;
}

interface ZonePerformance {
  id: string;
  name: string;
  vehicles: number;
  speed: number;
  status: 'normal' | 'moderate' | 'congested';
  statusLabel: string;
}

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent {

  currentDate = '02 Oct 2026';

  ranges: string[] = ['1H', '6H', '24H', '7D'];

  selectedRange = '24H';

  kpiMetrics: KpiMetric[] = [
    {
      label: 'Total Vehicles',
      value: '248',
      change: '+12.4%',
      trend: 'up',
      icon: 'vehicles',
      accent: 'blue'
    },
    {
      label: 'Average Speed',
      value: '42',
      unit: 'km/h',
      change: '+8.2%',
      trend: 'up',
      icon: 'speed',
      accent: 'violet'
    },
    {
      label: 'Avg. Journey Time',
      value: '08:42',
      change: '-6.8%',
      trend: 'down',
      icon: 'duration',
      accent: 'cyan'
    },
    {
      label: 'Traffic Alerts',
      value: '12',
      change: '+3.0%',
      trend: 'up',
      icon: 'alerts',
      accent: 'red'
    }
  ];

  vehicleDistribution: VehicleDistribution[] = [
    {
      label: 'Cars',
      count: 124,
      percentage: 50,
      accent: 'blue'
    },
    {
      label: 'Bikes',
      count: 42,
      percentage: 17,
      accent: 'amber'
    },
    {
      label: 'Buses',
      count: 18,
      percentage: 7,
      accent: 'violet'
    },
    {
      label: 'Trucks',
      count: 8,
      percentage: 3,
      accent: 'red'
    },
    {
      label: 'Other',
      count: 56,
      percentage: 23,
      accent: 'slate'
    }
  ];

  zones: ZonePerformance[] = [
    {
      id: 'CAM-01',
      name: 'Central Junction',
      vehicles: 72,
      speed: 46,
      status: 'normal',
      statusLabel: 'Normal'
    },
    {
      id: 'CAM-02',
      name: 'North Avenue',
      vehicles: 48,
      speed: 51,
      status: 'normal',
      statusLabel: 'Normal'
    },
    {
      id: 'CAM-03',
      name: 'East Corridor',
      vehicles: 83,
      speed: 31,
      status: 'congested',
      statusLabel: 'Congested'
    },
    {
      id: 'CAM-04',
      name: 'South Junction',
      vehicles: 45,
      speed: 38,
      status: 'moderate',
      statusLabel: 'Moderate'
    }
  ];

  setRange(range: string): void {
    this.selectedRange = range;
  }

}