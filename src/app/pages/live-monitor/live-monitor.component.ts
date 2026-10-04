import { Component } from '@angular/core';

interface Camera {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'warning' | 'offline';
  vehicles: number;
  fps: number;
  congestion: 'normal' | 'moderate' | 'congested';
}

interface Detection {
  id: string;
  type: 'car' | 'bus' | 'bike' | 'truck';
  confidence: number;
  speed: number;
  lane: string;
  status: 'normal' | 'warning' | 'critical';
}

interface Activity {
  type: string;
  camera: string;
  time: string;
  severity: 'normal' | 'warning' | 'critical';
}

@Component({
  selector: 'app-live-monitor',
  templateUrl: './live-monitor.component.html',
  styleUrls: ['./live-monitor.component.css']
})
export class LiveMonitorComponent {

  selectedCameraId = 'CAM-01';

  cameras: Camera[] = [
    {
      id: 'CAM-01',
      name: 'Central Junction',
      location: 'Sector 12 · Main Road',
      status: 'online',
      vehicles: 72,
      fps: 28,
      congestion: 'normal'
    },
    {
      id: 'CAM-02',
      name: 'North Avenue',
      location: 'Sector 8 · North Corridor',
      status: 'online',
      vehicles: 48,
      fps: 30,
      congestion: 'normal'
    },
    {
      id: 'CAM-03',
      name: 'East Corridor',
      location: 'Sector 15 · East Road',
      status: 'warning',
      vehicles: 83,
      fps: 26,
      congestion: 'congested'
    },
    {
      id: 'CAM-04',
      name: 'South Junction',
      location: 'Sector 4 · South Road',
      status: 'online',
      vehicles: 45,
      fps: 29,
      congestion: 'normal'
    }
  ];

  detections: Detection[] = [
    {
      id: '094',
      type: 'car',
      confidence: 94,
      speed: 42,
      lane: 'Lane 02',
      status: 'normal'
    },
    {
      id: '091',
      type: 'car',
      confidence: 91,
      speed: 51,
      lane: 'Lane 01',
      status: 'warning'
    },
    {
      id: '089',
      type: 'bus',
      confidence: 89,
      speed: 38,
      lane: 'Lane 03',
      status: 'normal'
    },
    {
      id: '087',
      type: 'bike',
      confidence: 96,
      speed: 46,
      lane: 'Lane 02',
      status: 'normal'
    },
    {
      id: '081',
      type: 'truck',
      confidence: 92,
      speed: 34,
      lane: 'Lane 03',
      status: 'normal'
    }
  ];

  activities: Activity[] = [
    {
      type: 'Speed threshold exceeded',
      camera: 'CAM-01 · Car',
      time: '10:42 AM',
      severity: 'critical'
    },
    {
      type: 'Vehicle detected',
      camera: 'CAM-01 · Bus',
      time: '10:41 AM',
      severity: 'normal'
    },
    {
      type: 'Possible congestion',
      camera: 'CAM-01 · Lane 03',
      time: '10:39 AM',
      severity: 'warning'
    },
    {
      type: 'Vehicle detected',
      camera: 'CAM-01 · Bike',
      time: '10:37 AM',
      severity: 'normal'
    }
  ];

  get selectedCamera(): Camera {
    return this.cameras.find(
      camera => camera.id === this.selectedCameraId
    ) || this.cameras[0];
  }

  selectCamera(cameraId: string): void {
    this.selectedCameraId = cameraId;
  }

  getStatusLabel(status: Camera['status']): string {
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
    congestion: Camera['congestion']
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

  getDetectionLabel(type: Detection['type']): string {
    return type.charAt(0).toUpperCase() + type.slice(1);
  }

  trackByCamera(index: number, camera: Camera): string {
    return camera.id;
  }

  trackByDetection(index: number, detection: Detection): string {
    return detection.id;
  }

  trackByActivity(index: number, activity: Activity): string {
    return activity.type + activity.time;
  }

}