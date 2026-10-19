import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  CameraInfo,
  TrafficEvent,
  VehicleDetection
} from '../../core/models/traffic.models';

import { TrafficDataService } from '../../core/services/traffic-data.service';

@Component({
  selector: 'app-live-monitor',
  templateUrl: './live-monitor.component.html',
  styleUrls: ['./live-monitor.component.css']
})
export class LiveMonitorComponent implements OnInit, AfterViewInit {

  @ViewChild('feedFrame')
  feedFrame?: ElementRef<HTMLDivElement>;

  cameras: CameraInfo[] = [];

  detections: VehicleDetection[] = [];

  activities: TrafficEvent[] = [];

  selectedCameraId = 'CAM-01';

  get selectedCamera(): CameraInfo {
    return this.cameras.find(
      camera => camera.id === this.selectedCameraId
    ) || {
      id: '—',
      name: 'Loading…',
      location: '—',
      zone: '—',
      status: 'offline',
      stream: 'offline',
      vehiclesDetected: 0,
      fps: 0,
      resolution: '—',
      lastSeen: '—',
      health: 0,
      congestion: 'normal'
    };
  }

  get avgDetectedSpeed(): number {
    const withSpeed = this.detections.filter(d => d.speedKmh !== null);

    if (!withSpeed.length) {
      return 0;
    }

    return Math.round(
      withSpeed.reduce((sum, d) => sum + (d.speedKmh || 0), 0) /
      withSpeed.length
    );
  }

  constructor(
    private route: ActivatedRoute,
    private trafficData: TrafficDataService
  ) {}

  ngOnInit(): void {

    this.route.queryParamMap.subscribe(params => {
      const camera = params.get('camera');
      if (camera) {
        this.selectedCameraId = camera;
      }
      this.loadCameraData();
    });
  }

  ngAfterViewInit(): void {
    /* feed reference ready for fullscreen toggling */
  }

  private loadCameraData(): void {

    this.trafficData.getCameras().subscribe(cameras => {
      this.cameras = cameras;
    });

    this.trafficData.getDetections(this.selectedCameraId).subscribe(
      detections => this.detections = detections
    );

    this.trafficData.getSummary().subscribe(summary => {
      this.activities = summary.recentEvents.filter(
        event => event.cameraId === this.selectedCameraId
      );
    });
  }

  selectCamera(cameraId: string): void {
    this.selectedCameraId = cameraId;
    this.loadCameraData();
  }

  toggleFullscreen(): void {

    const element = this.feedFrame?.nativeElement;

    if (!element) {
      return;
    }

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      element.requestFullscreen();
    }
  }

  getStatusLabel(status: CameraInfo['status']): string {
    switch (status) {
      case 'online':
        return 'Online';
      case 'warning':
        return 'Attention';
      case 'offline':
        return 'Offline';
      default:
        return 'Unknown';
    }
  }

  getCongestionLabel(
    congestion: CameraInfo['congestion']
  ): string {
    switch (congestion) {
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

  getDetectionLabel(type: VehicleDetection['category']): string {
    return type.charAt(0).toUpperCase() + type.slice(1);
  }

  detectionLabel(detection: VehicleDetection): string {
    return detection.category.toUpperCase();
  }

  trackByCamera(index: number, camera: CameraInfo): string {
    return camera.id;
  }

  trackByDetection(index: number, detection: VehicleDetection): string {
    return detection.trackingId;
  }

  trackByActivity(index: number, activity: TrafficEvent): string {
    return activity.type + activity.time;
  }

}
