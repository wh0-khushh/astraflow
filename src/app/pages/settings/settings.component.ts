import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

interface SettingSection {
  id: string;
  label: string;
  description: string;
}

interface UiPreferences {
  workspaceName: string;
  defaultTrafficRange: string;
  emailNotifications: boolean;
  criticalAlerts: boolean;
  cameraOfflineAlerts: boolean;
  soundAlerts: boolean;
  autoRefresh: boolean;
  refreshInterval: string;
  detectionSensitivity: string;
  vehicleDetection: boolean;
  speedMonitoring: boolean;
  darkMode: boolean;
}

/* Preferences persist in localStorage only — there is no
   account-settings backend yet (proposed endpoint:
   PUT /api/settings, not live). */
const STORAGE_KEY = 'astraflow_ui_preferences';

const DEFAULTS: UiPreferences = {
  workspaceName: 'AstraFlow Traffic Intelligence',
  defaultTrafficRange: '24 hours',
  emailNotifications: true,
  criticalAlerts: true,
  cameraOfflineAlerts: true,
  soundAlerts: false,
  autoRefresh: true,
  refreshInterval: '30',
  detectionSensitivity: 'balanced',
  vehicleDetection: true,
  speedMonitoring: true,
  darkMode: true
};

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {

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

  workspaceName = DEFAULTS.workspaceName;
  defaultTrafficRange = DEFAULTS.defaultTrafficRange;

  emailNotifications = DEFAULTS.emailNotifications;
  criticalAlerts = DEFAULTS.criticalAlerts;
  cameraOfflineAlerts = DEFAULTS.cameraOfflineAlerts;
  soundAlerts = DEFAULTS.soundAlerts;
  autoRefresh = DEFAULTS.autoRefresh;

  refreshInterval = DEFAULTS.refreshInterval;

  detectionSensitivity = DEFAULTS.detectionSensitivity;

  vehicleDetection = DEFAULTS.vehicleDetection;
  speedMonitoring = DEFAULTS.speedMonitoring;

  darkMode = DEFAULTS.darkMode;

  saveNotice: string | null = null;

  private noticeTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loadPreferences();
  }

  get currentUserEmail(): string {
    return this.auth.getUserEmail() || 'No account backend connected';
  }

  setSection(sectionId: string): void {
    this.activeSection = sectionId;
  }

  saveChanges(): void {

    const preferences: UiPreferences = {
      workspaceName: this.workspaceName,
      defaultTrafficRange: this.defaultTrafficRange,
      emailNotifications: this.emailNotifications,
      criticalAlerts: this.criticalAlerts,
      cameraOfflineAlerts: this.cameraOfflineAlerts,
      soundAlerts: this.soundAlerts,
      autoRefresh: this.autoRefresh,
      refreshInterval: this.refreshInterval,
      detectionSensitivity: this.detectionSensitivity,
      vehicleDetection: this.vehicleDetection,
      speedMonitoring: this.speedMonitoring,
      darkMode: this.darkMode
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
      this.showNotice('Saved locally on this device — settings are not synced to a backend yet.');
    } catch {
      this.showNotice('Could not save: browser storage is unavailable on this device.');
    }
  }

  resetChanges(): void {

    this.workspaceName = DEFAULTS.workspaceName;
    this.defaultTrafficRange = DEFAULTS.defaultTrafficRange;
    this.emailNotifications = DEFAULTS.emailNotifications;
    this.criticalAlerts = DEFAULTS.criticalAlerts;
    this.cameraOfflineAlerts = DEFAULTS.cameraOfflineAlerts;
    this.soundAlerts = DEFAULTS.soundAlerts;
    this.autoRefresh = DEFAULTS.autoRefresh;
    this.refreshInterval = DEFAULTS.refreshInterval;
    this.detectionSensitivity = DEFAULTS.detectionSensitivity;
    this.vehicleDetection = DEFAULTS.vehicleDetection;
    this.speedMonitoring = DEFAULTS.speedMonitoring;
    this.darkMode = DEFAULTS.darkMode;

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* Storage unavailable — defaults apply for this session only. */
    }

    this.showNotice('Restored default preferences on this device.');
  }

  changePassword(): void {
    window.alert(
      'Password management requires the backend account API, ' +
      'which is not connected yet. Current sign-in is a frontend demo.'
    );
  }

  signOut(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  private loadPreferences(): void {

    let raw: string | null = null;

    try {
      raw = localStorage.getItem(STORAGE_KEY);
    } catch {
      return;
    }

    if (!raw) {
      return;
    }

    try {
      const saved = JSON.parse(raw) as Partial<UiPreferences>;

      this.workspaceName = saved.workspaceName ?? this.workspaceName;
      this.defaultTrafficRange = saved.defaultTrafficRange ?? this.defaultTrafficRange;
      this.emailNotifications = saved.emailNotifications ?? this.emailNotifications;
      this.criticalAlerts = saved.criticalAlerts ?? this.criticalAlerts;
      this.cameraOfflineAlerts = saved.cameraOfflineAlerts ?? this.cameraOfflineAlerts;
      this.soundAlerts = saved.soundAlerts ?? this.soundAlerts;
      this.autoRefresh = saved.autoRefresh ?? this.autoRefresh;
      this.refreshInterval = saved.refreshInterval ?? this.refreshInterval;
      this.detectionSensitivity = saved.detectionSensitivity ?? this.detectionSensitivity;
      this.vehicleDetection = saved.vehicleDetection ?? this.vehicleDetection;
      this.speedMonitoring = saved.speedMonitoring ?? this.speedMonitoring;
      this.darkMode = saved.darkMode ?? this.darkMode;
    } catch {
      /* Corrupt storage — keep defaults. */
    }
  }

  private showNotice(message: string): void {

    this.saveNotice = message;

    if (this.noticeTimer) {
      clearTimeout(this.noticeTimer);
    }

    this.noticeTimer = setTimeout(() => this.saveNotice = null, 6000);
  }

  ngOnDestroy(): void {
    if (this.noticeTimer) {
      clearTimeout(this.noticeTimer);
    }
  }
}
