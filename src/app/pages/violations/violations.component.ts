import { Component, OnInit } from '@angular/core';

import {
  ViolationRecord,
  ViolationReviewStatus
} from '../../core/models/traffic.models';

import { TrafficDataService } from '../../core/services/traffic-data.service';

@Component({
  selector: 'app-violations',
  templateUrl: './violations.component.html',
  styleUrls: ['./violations.component.css']
})
export class ViolationsComponent implements OnInit {

  searchTerm = '';
  selectedSeverity = 'all';
  selectedStatus = 'all';

  violations: ViolationRecord[] = [];

  selectedViolation: ViolationRecord | null = null;

  ngOnInit(): void {
    this.trafficData.getViolations().subscribe(
      violations => this.violations = violations
    );
  }

  constructor(
    private trafficData: TrafficDataService
  ) {}

  get filteredViolations(): ViolationRecord[] {
    const search = this.searchTerm.trim().toLowerCase();

    return this.violations.filter((violation) => {

      const matchesSearch =
        !search ||
        violation.id.toLowerCase().includes(search) ||
        violation.type.toLowerCase().includes(search) ||
        violation.location.toLowerCase().includes(search) ||
        violation.cameraId.toLowerCase().includes(search) ||
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

  reviewViolation(violation: ViolationRecord): void {
    this.selectedViolation = violation;
  }

  closeDetails(): void {
    this.selectedViolation = null;
  }

  setStatus(status: ViolationReviewStatus): void {

    if (!this.selectedViolation) {
      return;
    }

    this.trafficData.reviewViolation(this.selectedViolation.id, status);

    this.selectedViolation = { ...this.selectedViolation, status };
  }

  exportReport(): void {
    /* CSV export requires real data from the backend. */
    window.alert(
      'Export requires the Python backend API, which is not connected yet.'
    );
  }

  trackByViolation(index: number, violation: ViolationRecord): string {
    return violation.id;
  }
}
