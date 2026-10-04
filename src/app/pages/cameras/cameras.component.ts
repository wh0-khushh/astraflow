import { Component } from '@angular/core';

interface Camera {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'warning' | 'offline';
  stream: 'live' | 'standby' | 'offline';
  vehicles: number;
  fps: number;
  resolution: string;
  lastSeen: string;
  zone: string;
  health: number;
}

@Component({
  selector: 'app-cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.css']
})
export class CamerasComponent {

  searchTerm = '';
  selectedStatus = 'all';

  cameras: Camera[] = [
    {
      id: 'CAM-01',
      name: 'Central Junction',
      location: 'Sector 12 · Main Road',
      status: 'online',
      stream: 'live',
      vehicles: 72,
      fps: 28,
      resolution: '1080p',
      lastSeen: 'Just now',
      zone: 'Zone A',
      health: 98
    },
    {
      id: 'CAM-02',
      name: 'North Avenue',
      location: 'Sector 08 · North Road',
      status: 'online',
      stream: 'live',
      vehicles: 48,
      fps: 30,
      resolution: '1080p',
      lastSeen: 'Just now',
      zone: 'Zone B',
      health: 96
    },
    {
      id: 'CAM-03',
      name: 'East Corridor',
      location: 'Sector 15 · East Road',
      status: 'warning',
      stream: 'live',
      vehicles: 83,
      fps: 24,
      resolution: '1080p',
      lastSeen: '18 sec ago',
      zone: 'Zone C',
      health: 81
    },
    {
      id: 'CAM-04',
      name: 'South Junction',
      location: 'Sector 04 · South Road',
      status: 'online',
      stream: 'live',
      vehicles: 45,
      fps: 29,
      resolution: '1080p',
      lastSeen: 'Just now',
      zone: 'Zone D',
      health: 94
    },
    {
      id: 'CAM-05',
      name: 'Market Crossing',
      location: 'Sector 21 · Market Road',
      status: 'online',
      stream: 'standby',
      vehicles: 31,
      fps: 25,
      resolution: '720p',
      lastSeen: '2 min ago',
      zone: 'Zone E',
      health: 91
    },
    {
      id: 'CAM-06',
      name: 'West Bypass',
      location: 'Sector 06 · Ring Road',
      status: 'offline',
      stream: 'offline',
      vehicles: 0,
      fps: 0,
      resolution: '1080p',
      lastSeen: '14 min ago',
      zone: 'Zone F',
      health: 0
    }
  ];

  get filteredCameras(): Camera[] {
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
      (total, camera) => total + camera.vehicles,
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
    // Backend refresh will be connected later.
  }

  openCamera(camera: Camera): void {
    // Live monitor navigation will be connected later.
    console.log('Open camera:', camera.id);
  }

  manageCamera(camera: Camera): void {
    // Camera configuration will be connected later.
    console.log('Manage camera:', camera.id);
  }

  trackByCamera(index: number, camera: Camera): string {
    return camera.id;
  }
}