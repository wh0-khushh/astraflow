import { Component, OnInit } from '@angular/core';

import { AppNotification } from '../../core/models/traffic.models';

import { TrafficDataService } from '../../core/services/traffic-data.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  isOpen = false;

  notifications: AppNotification[] = [];

  constructor(
    private trafficData: TrafficDataService
  ) {}

  ngOnInit(): void {
    this.trafficData.getNotifications().subscribe(
      notifications => this.notifications = notifications
    );
  }

  get unreadCount(): number {
    return this.notifications.filter(
      notification => notification.unread
    ).length;
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  close(): void {
    this.isOpen = false;
  }

  markAsRead(id: number): void {
    this.trafficData.markNotificationRead(id);
  }

  markAllAsRead(): void {
    this.trafficData.markAllNotificationsRead();
  }

  trackByNotification(index: number, notification: AppNotification): number {
    return notification.id;
  }

}
