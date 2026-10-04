import { Component } from '@angular/core';

type ViolationSeverity = 'critical' | 'warning' | 'normal';
type ViolationStatus = 'open' | 'reviewed' | 'resolved';

interface Violation {
  id: string;
  type: string;
  description: string;
  location: string;
  camera: string;
  vehicle: string;
  vehicleType: 'Car' | 'Bike' | 'Bus' | 'Truck';
  time: string;
  date: string;
  severity: ViolationSeverity;
  status: ViolationStatus;
  confidence: number;
}

@Component({
  selector: 'app-violations',
  templateUrl: './violations.component.html',
  styleUrls: ['./violations.component.css']
})
export class ViolationsComponent {

  searchTerm = '';
  selectedSeverity = 'all';
  selectedStatus = 'all';

  violations: Violation[] = [
    {
      id: 'VIO-1042',
      type: 'Speed Threshold Exceeded',
      description: 'Vehicle exceeded the configured speed limit',
      location: 'Central Junction',
      camera: 'CAM-01',
      vehicle: 'MH 12 AB 4821',
      vehicleType: 'Car',
      time: '10:39 AM',
      date: '02 Oct 2026',
      severity: 'critical',
      status: 'open',
      confidence: 96
    },
    {
      id: 'VIO-1041',
      type: 'Wrong-Way Movement',
      description: 'Vehicle detected moving against traffic direction',
      location: 'South Junction',
      camera: 'CAM-04',
      vehicle: 'JH 05 CD 2190',
      vehicleType: 'Car',
      time: '10:32 AM',
      date: '02 Oct 2026',
      severity: 'critical',
      status: 'open',
      confidence: 91
    },
    {
      id: 'VIO-1040',
      type: 'Vehicle Detection',
      description: 'Vehicle entered a monitored restricted zone',
      location: 'East Corridor',
      camera: 'CAM-03',
      vehicle: 'JH 01 EF 7824',
      vehicleType: 'Bus',
      time: '10:27 AM',
      date: '02 Oct 2026',
      severity: 'warning',
      status: 'reviewed',
      confidence: 89
    },
    {
      id: 'VIO-1039',
      type: 'Speed Threshold Exceeded',
      description: 'Vehicle exceeded the configured speed limit',
      location: 'North Avenue',
      camera: 'CAM-02',
      vehicle: 'BR 01 GH 4421',
      vehicleType: 'Bike',
      time: '10:21 AM',
      date: '02 Oct 2026',
      severity: 'warning',
      status: 'open',
      confidence: 94
    },
    {
      id: 'VIO-1038',
      type: 'Lane Violation',
      description: 'Vehicle detected outside designated travel lane',
      location: 'Central Junction',
      camera: 'CAM-01',
      vehicle: 'JH 05 KL 9012',
      vehicleType: 'Truck',
      time: '10:15 AM',
      date: '02 Oct 2026',
      severity: 'warning',
      status: 'reviewed',
      confidence: 87
    },
    {
      id: 'VIO-1037',
      type: 'Wrong-Way Movement',
      description: 'Possible wrong-way movement detected',
      location: 'East Corridor',
      camera: 'CAM-03',
      vehicle: 'JH 01 MN 3378',
      vehicleType: 'Car',
      time: '10:08 AM',
      date: '02 Oct 2026',
      severity: 'critical',
      status: 'resolved',
      confidence: 92
    },
    {
      id: 'VIO-1036',
      type: 'Vehicle Detection',
      description: 'Vehicle detected inside monitored zone',
      location: 'North Avenue',
      camera: 'CAM-02',
      vehicle: 'JH 05 PQ 6621',
      vehicleType: 'Car',
      time: '09:56 AM',
      date: '02 Oct 2026',
      severity: 'normal',
      status: 'resolved',
      confidence: 95
    },
    {
      id: 'VIO-1035',
      type: 'Speed Threshold Exceeded',
      description: 'Vehicle exceeded the configured speed limit',
      location: 'South Junction',
      camera: 'CAM-04',
      vehicle: 'JH 05 RS 1742',
      vehicleType: 'Bike',
      time: '09:42 AM',
      date: '02 Oct 2026',
      severity: 'warning',
      status: 'open',
      confidence: 90
    }
  ];

  get filteredViolations(): Violation[] {
    const search = this.searchTerm.trim().toLowerCase();

    return this.violations.filter((violation) => {

      const matchesSearch =
        !search ||
        violation.id.toLowerCase().includes(search) ||
        violation.type.toLowerCase().includes(search) ||
        violation.location.toLowerCase().includes(search) ||
        violation.camera.toLowerCase().includes(search) ||
        violation.vehicle.toLowerCase().includes(search);

      const matchesSeverity =
        this.selectedSeverity === 'all' ||
        violation.severity === this.selectedSeverity;

      const matchesStatus =
        this.selectedStatus === 'all' ||
        violation.status === this.selectedStatus;

      return matchesSearch && matchesSeverity && matchesStatus;
    });
  }

  get totalViolations(): number {
    return this.violations.length;
  }

  get criticalCount(): number {
    return this.violations.filter(
      violation => violation.severity === 'critical'
    ).length;
  }

  get warningCount(): number {
    return this.violations.filter(
      violation => violation.severity === 'warning'
    ).length;
  }

  get openCount(): number {
    return this.violations.filter(
      violation => violation.status === 'open'
    ).length;
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedSeverity = 'all';
    this.selectedStatus = 'all';
  }

  reviewViolation(violation: Violation): void {
    console.log('Review violation:', violation);
  }

  trackByViolation(index: number, violation: Violation): string {
    return violation.id;
  }
}