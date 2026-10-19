import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { TrafficDataService } from '../../core/services/traffic-data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  openViolations$: Observable<number> =
    this.trafficData.getOpenViolationCount();

  constructor(
    public router: Router,
    private trafficData: TrafficDataService
  ) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
