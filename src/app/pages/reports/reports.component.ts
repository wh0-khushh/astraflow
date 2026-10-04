import { Component } from '@angular/core';

interface Report {
  name: string;
  type: string;
  period: string;
  generated: string;
  status: 'Ready' | 'Processing';
  format: 'PDF' | 'CSV';
  size: string;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {

  selectedPeriod = 'Last 7 days';
  selectedType = 'All reports';

  reports: Report[] = [
    {
      name: 'Weekly Traffic Intelligence',
      type: 'Traffic Summary',
      period: 'Sep 26 – Oct 02, 2026',
      generated: 'Today, 10:42 AM',
      status: 'Ready',
      format: 'PDF',
      size: '2.4 MB'
    },
    {
      name: 'Violation Activity Report',
      type: 'Violations',
      period: 'Sep 26 – Oct 02, 2026',
      generated: 'Today, 09:18 AM',
      status: 'Ready',
      format: 'PDF',
      size: '1.8 MB'
    },
    {
      name: 'Vehicle Detection Export',
      type: 'Vehicle Analytics',
      period: 'Oct 01, 2026',
      generated: 'Yesterday, 06:32 PM',
      status: 'Ready',
      format: 'CSV',
      size: '846 KB'
    },
    {
      name: 'Camera Performance Report',
      type: 'Camera Health',
      period: 'Sep 01 – Sep 30, 2026',
      generated: 'Sep 30, 2026',
      status: 'Ready',
      format: 'PDF',
      size: '3.1 MB'
    },
    {
      name: 'Monthly Traffic Analysis',
      type: 'Traffic Summary',
      period: 'Sep 01 – Sep 30, 2026',
      generated: 'Sep 30, 2026',
      status: 'Ready',
      format: 'PDF',
      size: '4.7 MB'
    }
  ];

  reportTypes = [
    'Traffic Summary',
    'Violations',
    'Vehicle Analytics',
    'Camera Health'
  ];

  generateReport(): void {
    // Report generation will be connected to the backend later.
    console.log('Generate report');
  }

  downloadReport(report: Report): void {
    console.log('Download report:', report.name);
  }

  viewReport(report: Report): void {
    console.log('View report:', report.name);
  }

  setPeriod(period: string): void {
    this.selectedPeriod = period;
  }
}