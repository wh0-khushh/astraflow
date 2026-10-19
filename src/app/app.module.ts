import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { TopbarComponent } from './layout/topbar/topbar.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { StatCardComponent } from './shared/stat-card/stat-card.component';

import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { LiveMonitorComponent } from './pages/live-monitor/live-monitor.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { ViolationsComponent } from './pages/violations/violations.component';
import { CamerasComponent } from './pages/cameras/cameras.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { NotificationsComponent } from './shared/notifications/notifications.component';

@NgModule({

declarations: [

  AppComponent,

  // Layout
  MainLayoutComponent,
  SidebarComponent,
  TopbarComponent,

  // Auth
  LoginComponent,
  SignupComponent,
  ForgotPasswordComponent,
  ResetPasswordComponent,

  // Application pages
  DashboardComponent,
  LiveMonitorComponent,
  AnalyticsComponent,
  ViolationsComponent,
  CamerasComponent,
  ReportsComponent,
  SettingsComponent,

  // Shared
  StatCardComponent,
  NotificationsComponent

],

  imports: [

    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule

  ],

  providers: [],

  bootstrap: [
    AppComponent
  ]

})
export class AppModule {}