/* =========================================================
   ASTRAFLOW — TRAFFIC INTELLIGENCE DOMAIN MODELS

   These are PROPOSED frontend contracts, not confirmed
   backend schemas. When the Python AI/CV API output shape
   is finalized, adjust these interfaces in one place.

   Proposed endpoints for the Python backend (to confirm
   with the backend developer — none of these exist yet):

     GET  /api/cameras                     -> CameraInfo[]
     GET  /api/cameras/{id}/detections     -> VehicleDetection[]
     GET  /api/traffic/summary?range=24h   -> TrafficSummary
     GET  /api/traffic/flow?range=24h      -> TrafficFlowPoint[]
     GET  /api/violations                  -> ViolationRecord[]
     PATCH /api/violations/{id}/review     -> ViolationRecord
     GET  /api/notifications               -> AppNotification[]
     GET  /api/reports                     -> ReportRecord[]
     POST /api/reports/generate            -> ReportRecord
   ========================================================= */

export type CameraStatus = 'online' | 'warning' | 'offline';

export type StreamStatus = 'live' | 'standby' | 'offline';

export type CongestionLevel = 'normal' | 'moderate' | 'congested';

export type EventSeverity = 'normal' | 'warning' | 'critical';

export type VehicleCategory =
  | 'car'
  | 'bike'
  | 'bus'
  | 'truck'
  | 'other';

export type TimeRange = '1H' | '6H' | '24H' | '7D';

export interface CameraInfo {
  id: string;
  name: string;
  location: string;
  zone: string;
  status: CameraStatus;
  stream: StreamStatus;
  vehiclesDetected: number;
  fps: number;
  resolution: string;
  lastSeen: string;
  health: number;
  congestion: CongestionLevel;
}

export interface DetectionBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface VehicleDetection {
  trackingId: string;
  category: VehicleCategory;
  confidence: number;
  speedKmh: number | null;
  lane: string;
  cameraId: string;
  timestamp: string;
  status: EventSeverity;
  box: DetectionBox;
}

export type ViolationReviewStatus = 'open' | 'reviewed' | 'resolved';

export interface ViolationRecord {
  id: string;
  type: string;
  description: string;
  location: string;
  cameraId: string;
  vehicle: string;
  vehicleType: VehicleCategory;
  time: string;
  date: string;
  severity: EventSeverity;
  status: ViolationReviewStatus;
  confidence: number;
  evidenceAvailable: boolean;
}

export interface TrafficEvent {
  type: string;
  cameraId: string;
  detail: string;
  time: string;
  severity: EventSeverity;
}

export interface ZoneStat {
  cameraId: string;
  name: string;
  status: CongestionLevel;
  cameras: number;
  vehicles: number;
  avgSpeed: number;
  x: number;
  y: number;
}

export interface TrafficFlowPoint {
  label: string;
  flow: number;
  speed: number;
}

export interface VehicleMixSlice {
  label: string;
  category: VehicleCategory;
  count: number;
  percentage: number;
  accent: 'blue' | 'amber' | 'violet' | 'red' | 'slate';
}

export interface TrafficSummary {
  totalVehicles: number;
  avgSpeed: number;
  openAlerts: number;
  zoneCount: number;
  activeCameras: number;
  totalCameras: number;
  vehicleMix: VehicleMixSlice[];
  zones: ZoneStat[];
  recentEvents: TrafficEvent[];
  detections: VehicleDetection[];
}

export interface AppNotification {
  id: number;
  type: 'violation' | 'camera' | 'alert' | 'report';
  title: string;
  message: string;
  time: string;
  severity: EventSeverity;
  unread: boolean;
}

export interface ReportRecord {
  name: string;
  type: string;
  period: string;
  generated: string;
  status: 'Queued' | 'Processing' | 'Ready';
  format: 'PDF' | 'CSV';
  size: string | null;
}
