/* =========================================================
   ASTRAFLOW — CENTRALIZED SAMPLE DATA

   All screens read from this file through TrafficDataService.
   Everything here is SIMULATED sample data for UI
   development. Nothing is produced by a real AI pipeline.
   Replace with HTTP calls (see api.service.ts) once the
   Python backend endpoints are confirmed.

   Internal consistency rules:
   - camera vehiclesDetected sums to TOTAL_VEHICLES (279)
   - vehicleMix counts sum to TOTAL_VEHICLES
   - violations feed the sidebar alert count
   ========================================================= */

import {
  AppNotification,
  CameraInfo,
  ReportRecord,
  TimeRange,
  TrafficEvent,
  TrafficFlowPoint,
  VehicleDetection,
  VehicleMixSlice,
  ViolationRecord,
  ZoneStat
} from '../models/traffic.models';

export const MOCK_CAMERAS: CameraInfo[] = [
  {
    id: 'CAM-01',
    name: 'Central Junction',
    location: 'Sector 12 · Main Road',
    zone: 'Zone A',
    status: 'online',
    stream: 'live',
    vehiclesDetected: 72,
    fps: 28,
    resolution: '1080p',
    lastSeen: 'Just now',
    health: 98,
    congestion: 'normal'
  },
  {
    id: 'CAM-02',
    name: 'North Avenue',
    location: 'Sector 08 · North Road',
    zone: 'Zone B',
    status: 'online',
    stream: 'live',
    vehiclesDetected: 48,
    fps: 30,
    resolution: '1080p',
    lastSeen: 'Just now',
    health: 96,
    congestion: 'normal'
  },
  {
    id: 'CAM-03',
    name: 'East Corridor',
    location: 'Sector 15 · East Road',
    zone: 'Zone C',
    status: 'warning',
    stream: 'live',
    vehiclesDetected: 83,
    fps: 24,
    resolution: '1080p',
    lastSeen: '18 sec ago',
    health: 81,
    congestion: 'congested'
  },
  {
    id: 'CAM-04',
    name: 'South Junction',
    location: 'Sector 04 · South Road',
    zone: 'Zone D',
    status: 'online',
    stream: 'live',
    vehiclesDetected: 45,
    fps: 29,
    resolution: '1080p',
    lastSeen: 'Just now',
    health: 94,
    congestion: 'moderate'
  },
  {
    id: 'CAM-05',
    name: 'Market Crossing',
    location: 'Sector 21 · Market Road',
    zone: 'Zone E',
    status: 'online',
    stream: 'standby',
    vehiclesDetected: 31,
    fps: 25,
    resolution: '720p',
    lastSeen: '2 min ago',
    health: 91,
    congestion: 'normal'
  },
  {
    id: 'CAM-06',
    name: 'West Bypass',
    location: 'Sector 06 · Ring Road',
    zone: 'Zone F',
    status: 'offline',
    stream: 'offline',
    vehiclesDetected: 0,
    fps: 0,
    resolution: '1080p',
    lastSeen: '14 min ago',
    health: 0,
    congestion: 'normal'
  }
];

export const MOCK_VEHICLE_MIX: VehicleMixSlice[] = [
  { label: 'Cars', category: 'car', count: 142, percentage: 51, accent: 'blue' },
  { label: 'Bikes', category: 'bike', count: 47, percentage: 17, accent: 'amber' },
  { label: 'Buses', category: 'bus', count: 20, percentage: 7, accent: 'violet' },
  { label: 'Trucks', category: 'truck', count: 9, percentage: 3, accent: 'red' },
  { label: 'Other', category: 'other', count: 61, percentage: 22, accent: 'slate' }
];

export const MOCK_ZONES: ZoneStat[] = [
  {
    cameraId: 'CAM-01',
    name: 'Central Junction',
    status: 'normal',
    cameras: 2,
    vehicles: 72,
    avgSpeed: 46,
    x: 26,
    y: 30
  },
  {
    cameraId: 'CAM-02',
    name: 'North Avenue',
    status: 'normal',
    cameras: 1,
    vehicles: 48,
    avgSpeed: 51,
    x: 69,
    y: 28
  },
  {
    cameraId: 'CAM-03',
    name: 'East Corridor',
    status: 'congested',
    cameras: 2,
    vehicles: 83,
    avgSpeed: 31,
    x: 43,
    y: 67
  },
  {
    cameraId: 'CAM-04',
    name: 'South Junction',
    status: 'moderate',
    cameras: 1,
    vehicles: 45,
    avgSpeed: 38,
    x: 76,
    y: 70
  }
];

export const MOCK_DETECTIONS: VehicleDetection[] = [
  {
    trackingId: '094',
    category: 'car',
    confidence: 94,
    speedKmh: 42,
    lane: 'Lane 02',
    cameraId: 'CAM-01',
    timestamp: '10:42:18 AM',
    status: 'normal',
    box: { x: 34, y: 58, width: 16, height: 23 }
  },
  {
    trackingId: '091',
    category: 'car',
    confidence: 91,
    speedKmh: 51,
    lane: 'Lane 01',
    cameraId: 'CAM-01',
    timestamp: '10:41:52 AM',
    status: 'warning',
    box: { x: 56, y: 35, width: 13, height: 21 }
  },
  {
    trackingId: '089',
    category: 'bus',
    confidence: 89,
    speedKmh: 38,
    lane: 'Lane 03',
    cameraId: 'CAM-01',
    timestamp: '10:41:07 AM',
    status: 'normal',
    box: { x: 69, y: 43, width: 15, height: 28 }
  },
  {
    trackingId: '087',
    category: 'bike',
    confidence: 96,
    speedKmh: 46,
    lane: 'Lane 02',
    cameraId: 'CAM-01',
    timestamp: '10:40:31 AM',
    status: 'normal',
    box: { x: 18, y: 44, width: 8, height: 16 }
  },
  {
    trackingId: '081',
    category: 'truck',
    confidence: 92,
    speedKmh: 34,
    lane: 'Lane 03',
    cameraId: 'CAM-01',
    timestamp: '10:39:56 AM',
    status: 'normal',
    box: { x: 82, y: 52, width: 14, height: 30 }
  }
];

export const MOCK_EVENTS: TrafficEvent[] = [
  {
    type: 'Vehicle detected',
    cameraId: 'CAM-03',
    detail: 'Car',
    time: '10:42 AM',
    severity: 'normal'
  },
  {
    type: 'Speed threshold exceeded',
    cameraId: 'CAM-01',
    detail: 'Car · 51 km/h',
    time: '10:39 AM',
    severity: 'critical'
  },
  {
    type: 'Vehicle detected',
    cameraId: 'CAM-02',
    detail: 'Bike',
    time: '10:37 AM',
    severity: 'normal'
  },
  {
    type: 'Possible wrong-way movement',
    cameraId: 'CAM-04',
    detail: 'Car',
    time: '10:32 AM',
    severity: 'critical'
  },
  {
    type: 'Possible congestion building',
    cameraId: 'CAM-03',
    detail: 'Lane 03',
    time: '10:30 AM',
    severity: 'warning'
  },
  {
    type: 'Camera connection restored',
    cameraId: 'CAM-02',
    detail: 'North Avenue',
    time: '10:28 AM',
    severity: 'normal'
  }
];

export const MOCK_VIOLATIONS: ViolationRecord[] = [
  {
    id: 'VIO-1042',
    type: 'Speed Threshold Exceeded',
    description: 'Vehicle exceeded the configured speed limit',
    location: 'Central Junction',
    cameraId: 'CAM-01',
    vehicle: 'MH 12 AB 4821',
    vehicleType: 'car',
    time: '10:39 AM',
    date: 'Sample date',
    severity: 'critical',
    status: 'open',
    confidence: 96,
    evidenceAvailable: false
  },
  {
    id: 'VIO-1041',
    type: 'Wrong-Way Movement',
    description: 'Vehicle detected moving against traffic direction',
    location: 'South Junction',
    cameraId: 'CAM-04',
    vehicle: 'JH 05 CD 2190',
    vehicleType: 'car',
    time: '10:32 AM',
    date: 'Sample date',
    severity: 'critical',
    status: 'open',
    confidence: 91,
    evidenceAvailable: false
  },
  {
    id: 'VIO-1040',
    type: 'Restricted Zone Entry',
    description: 'Vehicle entered a monitored restricted zone',
    location: 'East Corridor',
    cameraId: 'CAM-03',
    vehicle: 'JH 01 EF 7824',
    vehicleType: 'bus',
    time: '10:27 AM',
    date: 'Sample date',
    severity: 'warning',
    status: 'reviewed',
    confidence: 89,
    evidenceAvailable: false
  },
  {
    id: 'VIO-1039',
    type: 'Speed Threshold Exceeded',
    description: 'Vehicle exceeded the configured speed limit',
    location: 'North Avenue',
    cameraId: 'CAM-02',
    vehicle: 'BR 01 GH 4421',
    vehicleType: 'bike',
    time: '10:21 AM',
    date: 'Sample date',
    severity: 'warning',
    status: 'open',
    confidence: 94,
    evidenceAvailable: false
  },
  {
    id: 'VIO-1038',
    type: 'Lane Violation',
    description: 'Vehicle detected outside designated travel lane',
    location: 'Central Junction',
    cameraId: 'CAM-01',
    vehicle: 'JH 05 KL 9012',
    vehicleType: 'truck',
    time: '10:15 AM',
    date: 'Sample date',
    severity: 'warning',
    status: 'reviewed',
    confidence: 87,
    evidenceAvailable: false
  },
  {
    id: 'VIO-1037',
    type: 'Wrong-Way Movement',
    description: 'Possible wrong-way movement detected',
    location: 'East Corridor',
    cameraId: 'CAM-03',
    vehicle: 'JH 01 MN 3378',
    vehicleType: 'car',
    time: '10:08 AM',
    date: 'Sample date',
    severity: 'critical',
    status: 'resolved',
    confidence: 92,
    evidenceAvailable: false
  },
  {
    id: 'VIO-1036',
    type: 'Vehicle Detection',
    description: 'Vehicle detected inside monitored zone',
    location: 'North Avenue',
    cameraId: 'CAM-02',
    vehicle: 'JH 05 PQ 6621',
    vehicleType: 'car',
    time: '09:56 AM',
    date: 'Sample date',
    severity: 'normal',
    status: 'resolved',
    confidence: 95,
    evidenceAvailable: false
  },
  {
    id: 'VIO-1035',
    type: 'Speed Threshold Exceeded',
    description: 'Vehicle exceeded the configured speed limit',
    location: 'South Junction',
    cameraId: 'CAM-04',
    vehicle: 'JH 05 RS 1742',
    vehicleType: 'bike',
    time: '09:42 AM',
    date: 'Sample date',
    severity: 'warning',
    status: 'open',
    confidence: 90,
    evidenceAvailable: false
  }
];

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 1,
    type: 'violation',
    title: 'New traffic violation detected',
    message: 'Speed violation detected at Central Junction (sample event).',
    time: '2 min ago',
    severity: 'critical',
    unread: true
  },
  {
    id: 2,
    type: 'camera',
    title: 'Camera connection restored',
    message: 'CAM-02 is back online (sample event).',
    time: '12 min ago',
    severity: 'normal',
    unread: true
  },
  {
    id: 3,
    type: 'alert',
    title: 'Traffic anomaly detected',
    message: 'Unusual congestion pattern in Zone C (sample event).',
    time: '28 min ago',
    severity: 'warning',
    unread: true
  },
  {
    id: 4,
    type: 'report',
    title: 'Daily report generated',
    message: 'Sample report entry — backend generation is not connected.',
    time: '1 hr ago',
    severity: 'normal',
    unread: false
  }
];

export const MOCK_REPORTS: ReportRecord[] = [
  {
    name: 'Weekly Traffic Intelligence',
    type: 'Traffic Summary',
    period: 'Last 7 days',
    generated: 'Sample entry',
    status: 'Queued',
    format: 'PDF',
    size: null
  },
  {
    name: 'Violation Activity Report',
    type: 'Violations',
    period: 'Last 7 days',
    generated: 'Sample entry',
    status: 'Queued',
    format: 'PDF',
    size: null
  },
  {
    name: 'Vehicle Detection Export',
    type: 'Vehicle Analytics',
    period: 'Yesterday',
    generated: 'Sample entry',
    status: 'Queued',
    format: 'CSV',
    size: null
  },
  {
    name: 'Camera Performance Report',
    type: 'Camera Health',
    period: 'Last 30 days',
    generated: 'Sample entry',
    status: 'Processing',
    format: 'PDF',
    size: null
  }
];

export const MOCK_FLOW_SERIES: { [range in TimeRange]: TrafficFlowPoint[] } = {
  '1H': [
    { label: '10:31', flow: 68, speed: 38 },
    { label: '10:36', flow: 72, speed: 36 },
    { label: '10:41', flow: 70, speed: 37 },
    { label: '10:46', flow: 75, speed: 35 },
    { label: '10:51', flow: 82, speed: 33 },
    { label: '10:56', flow: 79, speed: 34 },
    { label: '11:01', flow: 84, speed: 32 },
    { label: '11:06', flow: 88, speed: 31 },
    { label: '11:11', flow: 83, speed: 33 },
    { label: '11:16', flow: 90, speed: 30 },
    { label: '11:21', flow: 86, speed: 32 },
    { label: '11:26', flow: 92, speed: 31 }
  ],
  '6H': [
    { label: '06:00', flow: 41, speed: 44 },
    { label: '06:30', flow: 48, speed: 42 },
    { label: '07:00', flow: 55, speed: 40 },
    { label: '07:30', flow: 62, speed: 38 },
    { label: '08:00', flow: 70, speed: 36 },
    { label: '08:30', flow: 76, speed: 35 },
    { label: '09:00', flow: 81, speed: 33 },
    { label: '09:30', flow: 78, speed: 34 },
    { label: '10:00', flow: 84, speed: 32 },
    { label: '10:30', flow: 80, speed: 33 },
    { label: '11:00', flow: 86, speed: 31 },
    { label: '11:30', flow: 83, speed: 32 }
  ],
  '24H': [
    { label: '00:00', flow: 32, speed: 46 },
    { label: '02:00', flow: 28, speed: 50 },
    { label: '04:00', flow: 24, speed: 52 },
    { label: '06:00', flow: 30, speed: 48 },
    { label: '08:00', flow: 58, speed: 40 },
    { label: '10:00', flow: 86, speed: 34 },
    { label: '12:00', flow: 104, speed: 31 },
    { label: '14:00', flow: 92, speed: 36 },
    { label: '16:00', flow: 78, speed: 40 },
    { label: '18:00', flow: 88, speed: 37 },
    { label: '20:00', flow: 96, speed: 33 },
    { label: '22:00', flow: 74, speed: 38 }
  ],
  '7D': [
    { label: 'Mon', flow: 1450, speed: 41 },
    { label: 'Tue', flow: 1520, speed: 40 },
    { label: 'Wed', flow: 1480, speed: 42 },
    { label: 'Thu', flow: 1610, speed: 38 },
    { label: 'Fri', flow: 1720, speed: 37 },
    { label: 'Sat', flow: 1380, speed: 44 },
    { label: 'Sun', flow: 1240, speed: 46 }
  ]
};
