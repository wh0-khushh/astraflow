import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';

import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LiveMonitorComponent } from './pages/live-monitor/live-monitor.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { ViolationsComponent } from './pages/violations/violations.component';
import { CamerasComponent } from './pages/cameras/cameras.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [

  // =========================================================
  // AUTH ROUTES
  // =========================================================

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'signup',
    component: SignupComponent
  },

  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },

  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },


  // =========================================================
  // APPLICATION ROUTES
  // Sidebar + Topbar exist ONLY inside MainLayoutComponent
  // =========================================================

  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
children: [

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Traffic Overview', subtitle: 'Network situation across all monitored zones' }
  },

  {
    path: 'live-monitor',
    component: LiveMonitorComponent,
    data: { title: 'Live Monitor', subtitle: 'Camera observation & detection workspace' }
  },

  {
    path: 'analytics',
    component: AnalyticsComponent,
    data: { title: 'Analytics', subtitle: 'Traffic patterns, volume and performance' }
  },

  {
    path: 'violations',
    component: ViolationsComponent,
    data: { title: 'Violations', subtitle: 'Detected events pending human review' }
  },

  {
    path: 'cameras',
    component: CamerasComponent,
    data: { title: 'Cameras', subtitle: 'Camera fleet status & connectivity' }
  },

  {
    path: 'reports',
    component: ReportsComponent,
    data: { title: 'Reports', subtitle: 'Traffic intelligence report history' }
  },

  {
    path: 'settings',
    component: SettingsComponent,
    data: { title: 'Settings', subtitle: 'Workspace and monitoring preferences' }
  }

]
  },


  // =========================================================
  // FALLBACK
  // =========================================================

  {
    path: '**',
    redirectTo: 'login'
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],

  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}