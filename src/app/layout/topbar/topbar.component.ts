import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {

  @Output()
  menuClick = new EventEmitter<void>();

  searchTerm = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onMenuClick(): void {
    this.menuClick.emit();
  }

  runSearch(): void {
    const term = this.searchTerm.trim();

    this.router.navigate(
      ['/cameras'],
      term ? { queryParams: { q: term } } : undefined
    );
  }

  logout(): void {
    this.authService.logout();
  }
}
