import { Component, OnDestroy, OnInit } from '@angular/core';

import { ReportRecord } from '../../core/models/traffic.models';

import { TrafficDataService } from '../../core/services/traffic-data.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit, OnDestroy {

  selectedType = 'Traffic Summary';
  selectedPeriod = 'Last 7 days';
  listTypeFilter = 'All types';

  reports: ReportRecord[] = [];

  queuedNotice: string | null = null;

  private noticeTimer: ReturnType<typeof setTimeout> | null = null;

  reportTypes = [
    'Traffic Summary',
    'Violations',
    'Vehicle Analytics',
    'Camera Health'
  ];

  constructor(
    private trafficData: TrafficDataService
  ) {}

  ngOnInit(): void {
    this.trafficData.getReports().subscribe(
      reports => this.reports = reports
    );
  }

  get visibleReports(): ReportRecord[] {

    if (this.listTypeFilter === 'All types') {
      return this.reports;
    }

    return this.reports.filter(
      report => report.type === this.listTypeFilter
    );
  }

  get trafficReportCount(): number {
    return this.countByType('Traffic Summary');
  }

  get violationReportCount(): number {
    return this.countByType('Violations');
  }

  get csvCount(): number {
    return this.reports.filter(report => report.format === 'CSV').length;
  }

  generateReport(): void {

    const report = this.trafficData.queueReport(
      `${this.selectedType} Report`,
      this.selectedType,
      this.selectedPeriod
    );

    this.queuedNotice =
      `Queued "${report.name}" locally — backend generation not connected, ` +
      'no file will be produced yet.';

    if (this.noticeTimer) {
      clearTimeout(this.noticeTimer);
    }

    this.noticeTimer = setTimeout(() => this.queuedNotice = null, 6000);
  }

  ngOnDestroy(): void {
    if (this.noticeTimer) {
      clearTimeout(this.noticeTimer);
    }
  }

  downloadReport(report: ReportRecord): void {
    window.alert(
      'No file exists for this entry — report generation requires ' +
      'the Python backend API, which is not connected yet.'
    );
  }

  viewReport(report: ReportRecord): void {
    window.alert(
      'Report contents are produced by the Python backend, ' +
      'which is not connected yet. This entry is a sample record.'
    );
  }

  trackByReport(index: number, report: ReportRecord): string {
    return report.name + report.period;
  }

  private countByType(type: string): number {
    return this.reports.filter(report => report.type === type).length;
  }
}
