import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {

  @Output()
  menuClick = new EventEmitter<void>();

  constructor(
    private authService: AuthService
  ) {}

  onMenuClick(): void {
    this.menuClick.emit();
  }

  logout(): void {
    this.authService.logout();
  }
}