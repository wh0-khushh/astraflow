import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CameraInfo } from '../../core/models/traffic.models';
import { TrafficDataService } from '../../core/services/traffic-data.service';

@Component({
  selector: 'app-cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.css']
})
export class CamerasComponent implements OnInit, OnDestroy {

  searchTerm = '';
  selectedStatus = 'all';

  notice = '';
  private noticeTimer: ReturnType<typeof setTimeout> | undefined;

  cameras: CameraInfo[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private trafficData: TrafficDataService
  ) {}

  ngOnInit(): void {

    this.route.queryParamMap.subscribe(params => {
      const q = params.get('q');
      if (q) {
        this.searchTerm = q;
      }
    });

    this.trafficData.getCameras().subscribe(
      cameras => this.cameras = cameras
    );
  }

  get filteredCameras(): CameraInfo[] {
    return this.cameras.filter((camera) => {

      const matchesSearch =
        !this.searchTerm ||
        camera.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        camera.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        camera.location.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesStatus =
        this.selectedStatus === 'all' ||
        camera.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  get onlineCount(): number {
    return this.cameras.filter(camera => camera.status === 'online').length;
  }

  get warningCount(): number {
    return this.cameras.filter(camera => camera.status === 'warning').length;
  }

  get offlineCount(): number {
    return this.cameras.filter(camera => camera.status === 'offline').length;
  }

  get totalVehicles(): number {
    return this.cameras.reduce(
      (total, camera) => total + camera.vehiclesDetected,
      0
    );
  }

  setStatus(status: string): void {
    this.selectedStatus = status;
  }

  clearSearch(): void {
    this.searchTerm = '';
  }

  refreshCameras(): void {
    /* Re-reads the current data source. Becomes a real
       GET /api/cameras once the Python backend is live. */
    this.trafficData.getCameras().subscribe(
      cameras => this.cameras = cameras
    );
  }

  openCamera(camera: CameraInfo): void {
    this.router.navigate(
      ['/live-monitor'],
      { queryParams: { camera: camera.id } }
    );
  }

  manageCamera(camera: CameraInfo): void {
    this.showNotice(
      `${camera.id}: camera configuration requires the Python backend API, which is not connected yet.`
    );
  }

  requestAddCamera(): void {
    this.showNotice(
      'Adding cameras requires the Python backend API, which is not connected yet.'
    );
  }

  private showNotice(message: string): void {
    this.notice = message;

    if (this.noticeTimer) {
      clearTimeout(this.noticeTimer);
    }

    this.noticeTimer = setTimeout(() => this.notice = '', 5000);
  }

  ngOnDestroy(): void {
    if (this.noticeTimer) {
      clearTimeout(this.noticeTimer);
    }
  }

  trackByCamera(index: number, camera: CameraInfo): string {
    return camera.id;
  }
}