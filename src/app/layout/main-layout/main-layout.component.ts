import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {

  mobileSidebarOpen = false;

  constructor(
    private router: Router,
    private titleService: Title
  ) {

    this.router.events
      .pipe(
        filter(
          event => event instanceof NavigationEnd
        )
      )
      .subscribe(() => {
        this.mobileSidebarOpen = false;
      });

    this.router.events
      .pipe(
        filter(
          event => event instanceof ActivationEnd
        )
      )
      .subscribe(event => {
        const snapshot = (event as ActivationEnd).snapshot;
        const title = snapshot.data['title'];

        if (title) {
          this.titleService.setTitle(
            `${title} · AstraFlow`
          );
        }
      });

  }

  toggleMobileSidebar(): void {
    this.mobileSidebarOpen = !this.mobileSidebarOpen;
  }

  closeMobileSidebar(): void {
    this.mobileSidebarOpen = false;
  }

}