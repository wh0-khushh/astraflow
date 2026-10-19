import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map, of, delay } from 'rxjs';

import {
  AppNotification,
  CameraInfo,
  ReportRecord,
  TimeRange,
  TrafficFlowPoint,
  TrafficSummary,
  VehicleDetection,
  ViolationRecord,
  ViolationReviewStatus
} from '../models/traffic.models';

import {
  MOCK_CAMERAS,
  MOCK_DETECTIONS,
  MOCK_EVENTS,
  MOCK_FLOW_SERIES,
  MOCK_NOTIFICATIONS,
  MOCK_REPORTS,
  MOCK_VEHICLE_MIX,
  MOCK_VIOLATIONS,
  MOCK_ZONES
} from '../data/mock-data';

/* =========================================================
   Single source of truth for all traffic data.

   Currently backed by sample data (mock-data.ts). When the
   Python API is confirmed, swap each method body to an
   ApiService call — component code stays unchanged.
   ========================================================= */

@Injectable({
  providedIn: 'root'
})
export class TrafficDataService {

  private readonly cameras$ = new BehaviorSubject<CameraInfo[]>(MOCK_CAMERAS);
  private readonly violations$ = new BehaviorSubject<ViolationRecord[]>(MOCK_VIOLATIONS);
  private readonly notifications$ = new BehaviorSubject<AppNotification[]>(MOCK_NOTIFICATIONS);
  private readonly reports$ = new BehaviorSubject<ReportRecord[]>(MOCK_REPORTS);

  /* Simulated network latency so loading states are real. */
  private emit<T>(data: T): Observable<T> {
    return of(data).pipe(delay(180));
  }

  getCameras(): Observable<CameraInfo[]> {
    return this.emit(this.cameras$.value);
  }

  getCamera(cameraId: string): Observable<CameraInfo | undefined> {
    return this.emit(
      this.cameras$.value.find(camera => camera.id === cameraId)
    );
  }

  getDetections(cameraId: string): Observable<VehicleDetection[]> {
    // Sample overlay detections exist only for CAM-01;
    // other cameras honestly return an empty list.
    return this.emit(
      cameraId === 'CAM-01' ? MOCK_DETECTIONS : []
    );
  }

  getViolations(): Observable<ViolationRecord[]> {
    /* Live stream: review-status changes must refresh open lists
       (badge, analytics alerts) in step with each other. */
    return this.violations$.asObservable();
  }

  getOpenViolationCount(): Observable<number> {
    return this.violations$.pipe(
      map(violations => violations.filter(v => v.status === 'open').length)
    );
  }

  reviewViolation(id: string, status: ViolationReviewStatus): void {
    this.violations$.next(
      this.violations$.value.map(violation =>
        violation.id === id ? { ...violation, status } : violation
      )
    );
  }

  getSummary(): Observable<TrafficSummary> {
    return combineLatest([this.cameras$, this.violations$]).pipe(
      map(([cameras, violations]) => {
        const totalVehicles = cameras.reduce(
          (sum, camera) => sum + camera.vehiclesDetected,
          0
        );
        const online = cameras.filter(c => c.status !== 'offline');
        const avgSpeed = online.length
          ? Math.round(
              MOCK_ZONES.reduce((sum, z) => sum + z.avgSpeed, 0) /
              MOCK_ZONES.length
            )
          : 0;

        return {
          totalVehicles,
          avgSpeed,
          openAlerts: violations.filter(v => v.status === 'open').length,
          zoneCount: new Set(cameras.map(c => c.zone)).size,
          activeCameras: cameras.filter(c => c.status === 'online').length,
          totalCameras: cameras.length,
          vehicleMix: MOCK_VEHICLE_MIX,
          zones: MOCK_ZONES,
          recentEvents: MOCK_EVENTS,
          detections: MOCK_DETECTIONS
        };
      })
    );
  }

  getFlowSeries(range: TimeRange): Observable<TrafficFlowPoint[]> {
    return this.emit(MOCK_FLOW_SERIES[range]);
  }

  getNotifications(): Observable<AppNotification[]> {
    return this.notifications$.asObservable();
  }

  markNotificationRead(id: number): void {
    this.notifications$.next(
      this.notifications$.value.map(n =>
        n.id === id ? { ...n, unread: false } : n
      )
    );
  }

  markAllNotificationsRead(): void {
    this.notifications$.next(
      this.notifications$.value.map(n => ({ ...n, unread: false }))
    );
  }

  getReports(): Observable<ReportRecord[]> {
    return this.reports$.asObservable();
  }

  /* Report generation is NOT connected to a backend.
     Queued entries are clearly marked and never claim a
     downloadable file exists. */
  queueReport(name: string, type: string, period: string): ReportRecord {
    const report: ReportRecord = {
      name,
      type,
      period,
      generated: 'Queued locally — backend generation not connected',
      status: 'Queued',
      format: 'PDF',
      size: null
    };

    this.reports$.next([report, ...this.reports$.value]);
    return report;
  }
}
