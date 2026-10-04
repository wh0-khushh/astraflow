import { Component } from '@angular/core';

interface SettingSection {
  id: string;
  label: string;
  description: string;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  activeSection = 'general';

  sections: SettingSection[] = [
    {
      id: 'general',
      label: 'General',
      description: 'Workspace and application preferences'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      description: 'Alerts and system notifications'
    },
    {
      id: 'monitoring',
      label: 'Monitoring',
      description: 'Traffic detection preferences'
    },
    {
      id: 'security',
      label: 'Security',
      description: 'Account and access controls'
    }
  ];

  emailNotifications = true;
  criticalAlerts = true;
  cameraOfflineAlerts = true;
  soundAlerts = false;
  autoRefresh = true;

  refreshInterval = '30';

  detectionSensitivity = 'balanced';

  darkMode = true;

  setSection(sectionId: string): void {
    this.activeSection = sectionId;
  }

  saveChanges(): void {
    console.log('Settings saved');
  }

  resetChanges(): void {
    this.emailNotifications = true;
    this.criticalAlerts = true;
    this.cameraOfflineAlerts = true;
    this.soundAlerts = false;
    this.autoRefresh = true;
    this.refreshInterval = '30';
    this.detectionSensitivity = 'balanced';
    this.darkMode = true;
  }
}