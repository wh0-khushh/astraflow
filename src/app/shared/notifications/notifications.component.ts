import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {

  isOpen = false;

  notifications = [
    {
      id: 1,
      type: 'violation',
      title: 'New traffic violation detected',
      message: 'Speed violation detected at Zone A-04.',
      time: '2 min ago',
      unread: true
    },
    {
      id: 2,
      type: 'camera',
      title: 'Camera connection restored',
      message: 'CAM-04 is back online.',
      time: '12 min ago',
      unread: true
    },
    {
      id: 3,
      type: 'alert',
      title: 'Traffic anomaly detected',
      message: 'Unusual traffic activity detected in Zone B.',
      time: '28 min ago',
      unread: true
    },
    {
      id: 4,
      type: 'report',
      title: 'Daily report generated',
      message: 'Your traffic intelligence report is ready.',
      time: '1 hr ago',
      unread: false
    }
  ];

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
    const notification = this.notifications.find(
      item => item.id === id
    );

    if (notification) {
      notification.unread = false;
    }
  }

  markAllAsRead(): void {
    this.notifications.forEach(
      notification => notification.unread = false
    );
  }

}