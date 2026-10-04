import { Component } from '@angular/core';

interface DashboardMetric {
  label: string;
  value: string;
  unit?: string;
  comparison: string;
  trend: 'up' | 'down' | 'neutral';
  icon: 'vehicles' | 'speed' | 'alerts' | 'zones';
  accent: 'blue' | 'violet' | 'red' | 'cyan';
  description: string;
}

interface VehicleType {
  label: string;
  count: number;
  percentage: number;
  icon: 'car' | 'bike' | 'bus' | 'truck' | 'other';
  accent: 'blue' | 'amber' | 'violet' | 'red' | 'slate';
}

interface TrafficEvent {
  type: string;
  location: string;
  time: string;
  severity: 'normal' | 'warning' | 'critical';
  icon: 'vehicle' | 'speed' | 'wrong-way' | 'camera' | 'congestion';
}

interface TrafficZone {
  id: string;
  name: string;
  status: 'normal' | 'moderate' | 'congested';
  cameras: number;
  vehicles: number;
  x: number;
  y: number;
}

interface CameraDetection {
  label: string;
  confidence: number;
  trackingId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'car' | 'bus' | 'bike';
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  /* =========================================================
     HEADER
     ========================================================= */

  currentDate = '02 Oct 2026';

  /* =========================================================
     FILTERS
     ========================================================= */

  ranges: string[] = ['1H', '6H', '24H', '7D'];

  selectedRange = '24H';

  /* =========================================================
     KPI METRICS
     ========================================================= */

  dashboardMetrics: DashboardMetric[] = [

    {
      label: 'Total Vehicles',
      value: '248',
      comparison: '+12%',
      trend: 'up',
      icon: 'vehicles',
      accent: 'blue',
      description: 'Detected across monitored zones'
    },

    {
      label: 'Average Speed',
      value: '42',
      unit: 'km/h',
      comparison: '+8%',
      trend: 'up',
      icon: 'speed',
      accent: 'violet',
      description: 'Across active road segments'
    },

    {
      label: 'Active Alerts',
      value: '12',
      comparison: '+3%',
      trend: 'up',
      icon: 'alerts',
      accent: 'red',
      description: 'Require attention'
    },

    {
      label: 'Traffic Zones',
      value: '08',
      comparison: 'Normal',
      trend: 'neutral',
      icon: 'zones',
      accent: 'cyan',
      description: 'All monitored zones'
    }

  ];

  /* =========================================================
     VEHICLE MIX
     ========================================================= */

  vehicleTypes: VehicleType[] = [

    {
      label: 'Cars',
      count: 124,
      percentage: 50,
      icon: 'car',
      accent: 'blue'
    },

    {
      label: 'Bikes',
      count: 42,
      percentage: 17,
      icon: 'bike',
      accent: 'amber'
    },

    {
      label: 'Buses',
      count: 18,
      percentage: 7,
      icon: 'bus',
      accent: 'violet'
    },

    {
      label: 'Trucks',
      count: 8,
      percentage: 3,
      icon: 'truck',
      accent: 'red'
    },

    {
      label: 'Other',
      count: 56,
      percentage: 23,
      icon: 'other',
      accent: 'slate'
    }

  ];

  /* =========================================================
     TRAFFIC ZONES
     ========================================================= */

  trafficZones: TrafficZone[] = [

    {
      id: 'CAM-01',
      name: 'Central Junction',
      status: 'normal',
      cameras: 2,
      vehicles: 72,
      x: 26,
      y: 30
    },

    {
      id: 'CAM-02',
      name: 'North Avenue',
      status: 'normal',
      cameras: 1,
      vehicles: 48,
      x: 69,
      y: 28
    },

    {
      id: 'CAM-03',
      name: 'East Corridor',
      status: 'congested',
      cameras: 2,
      vehicles: 83,
      x: 43,
      y: 67
    },

    {
      id: 'CAM-04',
      name: 'South Junction',
      status: 'normal',
      cameras: 1,
      vehicles: 45,
      x: 76,
      y: 70
    }

  ];

  /* =========================================================
     RECENT EVENTS
     ========================================================= */

  events: TrafficEvent[] = [

    {
      type: 'Vehicle detected',
      location: 'CAM-03 · Car',
      time: '10:42 AM',
      severity: 'warning',
      icon: 'vehicle'
    },

    {
      type: 'Speed threshold exceeded',
      location: 'CAM-01 · Car',
      time: '10:39 AM',
      severity: 'critical',
      icon: 'speed'
    },

    {
      type: 'Vehicle detected',
      location: 'CAM-02 · Bike',
      time: '10:37 AM',
      severity: 'normal',
      icon: 'vehicle'
    },

    {
      type: 'Possible wrong-way movement',
      location: 'CAM-04 · Car',
      time: '10:32 AM',
      severity: 'critical',
      icon: 'wrong-way'
    },

    {
      type: 'Camera connection restored',
      location: 'CAM-02 · North Avenue',
      time: '10:28 AM',
      severity: 'normal',
      icon: 'camera'
    }

  ];

  /* =========================================================
     LIVE CAMERA DETECTIONS
     ========================================================= */

  detections: CameraDetection[] = [

    {
      label: 'CAR',
      confidence: 94,
      trackingId: '094',
      x: 34,
      y: 58,
      width: 16,
      height: 23,
      type: 'car'
    },

    {
      label: 'CAR',
      confidence: 91,
      trackingId: '091',
      x: 56,
      y: 35,
      width: 13,
      height: 21,
      type: 'car'
    },

    {
      label: 'BUS',
      confidence: 89,
      trackingId: '089',
      x: 69,
      y: 43,
      width: 15,
      height: 28,
      type: 'bus'
    }

  ];

  /* =========================================================
     TRAFFIC FLOW
     ========================================================= */

  flowPoints = [
    '0,142',
    '35,135',
    '70,126',
    '105,113',
    '140,88',
    '175,102',
    '210,121',
    '245,115',
    '280,72',
    '315,51',
    '350,68',
    '385,61',
    '420,82',
    '455,96'
  ].join(' ');

  speedPoints = [
    '0,166',
    '35,160',
    '70,153',
    '105,147',
    '140,138',
    '175,143',
    '210,151',
    '245,142',
    '280,133',
    '315,128',
    '350,135',
    '385,132',
    '420,140',
    '455,145'
  ].join(' ');

  /* =========================================================
     HELPERS
     ========================================================= */

  getStatusLabel(
    status: TrafficZone['status']
  ): string {

    switch (status) {

      case 'normal':
        return 'Normal';

      case 'moderate':
        return 'Moderate';

      case 'congested':
        return 'Congested';

      default:
        return 'Unknown';

    }

  }

  setRange(range: string): void {
    this.selectedRange = range;
  }

  trackByMetric(
    index: number,
    item: DashboardMetric
  ): string {
    return item.label;
  }

  trackByLabel(
    index: number,
    item: VehicleType
  ): string {
    return item.label;
  }

  trackByEvent(
    index: number,
    item: TrafficEvent
  ): string {
    return item.type + item.time;
  }

  trackByDetection(
    index: number,
    item: CameraDetection
  ): string {
    return item.trackingId;
  }

  trackByZone(
    index: number,
    item: TrafficZone
  ): string {
    return item.id;
  }

}