# AstraFlow 🚦

## AI-Powered Traffic Intelligence & Road Monitoring System

**AstraFlow** is an AI-powered traffic intelligence platform designed for real-time road monitoring, vehicle analysis, traffic violation detection, camera monitoring, analytics, notifications, and intelligent reporting.

The system is being developed with an **Angular frontend** and a **Python-based backend/AI layer**.

### Core Vision

> **Observe → Detect → Analyze → Understand → Report**

AstraFlow aims to transform traffic-camera data into meaningful, actionable traffic intelligence through AI-powered detection and analysis.

---

# ✦ Project Architecture

```text
                         ASTRAFLOW
                            │
                            ▼
                 ┌─────────────────────┐
                 │ Traffic Cameras /   │
                 │ Video Sources        │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │ Python AI Layer     │
                 │ Detection           │
                 │ Tracking            │
                 │ Classification      │
                 │ Violation Detection │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │ Python Backend/API  │
                 │ Authentication      │
                 │ Database            │
                 │ Analytics           │
                 │ Reports             │
                 │ Notifications       │
                 └──────────┬──────────┘
                            │
                       REST / JSON
                            │
                            ▼
                 ┌─────────────────────┐
                 │ Angular Frontend    │
                 │                     │
                 │ Dashboard           │
                 │ Live Monitor        │
                 │ Analytics           │
                 │ Violations          │
                 │ Cameras             │
                 │ Reports             │
                 │ Settings            │
                 └─────────────────────┘
```

---

# 🖥️ Current Frontend

The frontend has been implemented using:

* Angular 14.2.13
* TypeScript
* HTML5
* CSS3
* Angular Router
* RxJS
* Component-based architecture
* Responsive layout
* Reusable components
* Route structure
* Authentication structure

The frontend currently provides the complete UI foundation required for backend integration.

---

# 📁 Frontend Structure

```text
src/
└── app/
    │
    ├── core/
    │   ├── guards/
    │   │   └── auth.guard.ts
    │   │
    │   └── services/
    │       └── auth.service.ts
    │
    ├── layout/
    │   ├── main-layout/
    │   ├── sidebar/
    │   └── topbar/
    │
    ├── pages/
    │   ├── analytics/
    │   ├── cameras/
    │   ├── dashboard/
    │   ├── forgot-password/
    │   ├── live-monitor/
    │   ├── login/
    │   ├── reports/
    │   ├── reset-password/
    │   ├── settings/
    │   ├── signup/
    │   └── violations/
    │
    └── shared/
        ├── notifications/
        └── stat-card/
```

---

# ✦ Completed Frontend Features

## 🔐 Authentication

Implemented:

* Login UI
* Signup UI
* Forgot Password UI
* Reset Password UI
* Authentication routing
* Logout UI
* Auth service structure
* Auth guard structure

### Current Status

The frontend authentication structure is ready.

Real authentication will be connected after the Python backend/API is available.

Required backend endpoints will include functionality for:

```text
Login
Signup
Forgot Password
Reset Password
JWT / Session
User information
Logout / token invalidation
```

---

# 📊 Dashboard

The dashboard provides the main traffic intelligence overview.

UI sections are prepared for:

* Traffic volume
* Vehicle count
* Active cameras
* Violations
* Traffic trends
* AI detection statistics
* System status
* Traffic insights

Currently the displayed values are frontend/static data.

These will be replaced with API-driven values.

---

# 📹 Live Monitor

The Live Monitor is prepared for real-time traffic observation.

Planned integration:

* Live camera feeds
* Vehicle detection
* Vehicle tracking
* Traffic activity
* AI detection events
* Real-time alerts

The frontend UI is ready for the backend/camera pipeline.

---

# 📈 Analytics

The Analytics page is prepared for:

* Vehicle flow
* Traffic trends
* Peak traffic periods
* Vehicle categories
* Violation trends
* Camera-wise statistics
* AI-generated insights

Actual values will come from backend APIs.

---

# 🚨 Violations

The Violations module is prepared to display AI-detected traffic violations.

Expected backend data:

```text
Violation Type
Vehicle Information
Camera
Location
Timestamp
Detection Status
Evidence
Violation Statistics
```

The frontend currently provides the UI and routing structure.

---

# 📷 Cameras

The Cameras page is prepared for camera management.

Planned functionality:

* Camera list
* Camera status
* Camera location
* Active / inactive state
* Live feed
* Camera-specific analytics

Camera information will eventually be supplied by the backend.

---

# 📑 Reports

The Reports module is prepared for:

* Traffic reports
* Violation reports
* Camera reports
* Vehicle statistics
* Date/time based reports
* Analytics summaries

The backend will provide the actual report data.

---

# 🔔 Notifications

A reusable notification component has been created in:

```text
src/app/shared/notifications/
```

It is integrated into the topbar.

It is intended for events such as:

* New violations
* Camera status changes
* AI detection alerts
* Important traffic events
* System notifications

Currently the notification UI is frontend-side.

It can later be connected to backend polling, WebSocket, Server-Sent Events, or another real-time mechanism depending on the backend architecture.

---

# ⚙️ Settings

The Settings page provides the frontend structure for future system/user configuration.

Backend integration can later be added for:

* User profile settings
* System preferences
* Notification preferences
* Camera configuration
* AI configuration
* Account settings

---

# ✦ Current Frontend Status

| Feature              | Status     |
| -------------------- | ---------- |
| Login                | ✅ Complete |
| Signup               | ✅ Complete |
| Forgot Password      | ✅ Complete |
| Reset Password       | ✅ Complete |
| Auth Routing         | ✅ Complete |
| Main Layout          | ✅ Complete |
| Sidebar              | ✅ Complete |
| Sidebar Routing      | ✅ Complete |
| Topbar               | ✅ Complete |
| Mobile Sidebar       | ✅ Complete |
| Notifications UI     | ✅ Complete |
| Dashboard UI         | ✅ Complete |
| Live Monitor UI      | ✅ Complete |
| Analytics UI         | ✅ Complete |
| Violations UI        | ✅ Complete |
| Cameras UI           | ✅ Complete |
| Reports UI           | ✅ Complete |
| Settings UI          | ✅ Complete |
| Logout UI            | ✅ Complete |
| Responsive Structure | ✅ Complete |
| Production Build     | ✅ Verified |

---

# ✦ Backend / AI Integration Status

| Task                      | Status    |
| ------------------------- | --------- |
| Python Backend            | ⬜ Pending |
| Database                  | ⬜ Pending |
| Authentication API        | ⬜ Pending |
| Login API                 | ⬜ Pending |
| Signup API                | ⬜ Pending |
| Forgot Password API       | ⬜ Pending |
| Reset Password API        | ⬜ Pending |
| JWT / Session Handling    | ⬜ Pending |
| Frontend Auth Integration | ⬜ Pending |
| Dashboard API             | ⬜ Pending |
| Violation API             | ⬜ Pending |
| Camera API                | ⬜ Pending |
| Analytics API             | ⬜ Pending |
| Reports API               | ⬜ Pending |
| Live Camera Integration   | ⬜ Pending |
| AI Detection Pipeline     | ⬜ Pending |
| Vehicle Tracking          | ⬜ Pending |
| Real-time Notifications   | ⬜ Pending |

---

# ✦ Backend Integration Flow

Once the Python backend is ready, the frontend will communicate through API services.

```text
Angular Component
       │
       ▼
Angular Service
       │
       ▼
HTTP Request
       │
       ▼
Python REST API
       │
       ├── Database
       │
       └── AI Processing
              │
              ▼
        Detection / Analysis
              │
              ▼
          JSON Response
              │
              ▼
       Angular Service
              │
              ▼
        Angular Component
              │
              ▼
       Dashboard / UI
```

For example:

```text
Dashboard
   ↓
DashboardService
   ↓
GET /api/dashboard
   ↓
Python Backend
   ↓
Database / AI Results
   ↓
JSON
   ↓
Dashboard UI
```

---

# 🐍 Python / AI Responsibilities

The Python side is expected to handle the intelligence and backend processing layer.

Potential responsibilities:

### AI / Computer Vision

* Vehicle detection
* Vehicle classification
* Vehicle tracking
* Vehicle counting
* Speed estimation
* Traffic density analysis
* Traffic violation detection
* Anomaly detection
* Video processing

### Backend

* REST APIs
* Authentication
* Database operations
* User management
* Dashboard data
* Camera management
* Analytics
* Reports
* Notifications
* AI result storage

---

# ✦ Frontend ↔ Python Contract

The most important integration point will be the API contract.

For each feature, define:

```text
Endpoint
HTTP Method
Request Body
Query Parameters
Authentication
Response JSON
Error Response
```

Example:

```text
GET /api/dashboard/summary
```

Response:

```json
{
  "vehiclesToday": 1248,
  "activeCameras": 18,
  "violationsToday": 42,
  "trafficLevel": "HIGH"
}
```

The Angular frontend can then consume this response through a service.

---

# 🚀 Getting Started

## Prerequisites

Install:

* Node.js
* npm
* Angular CLI
* Git

---

# Clone the Repository

```bash
git clone https://github.com/wh0-khushh/astraflow.git
```

Move into the project:

```bash
cd astraflow
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npx ng serve
```

Open:

```text
http://localhost:4200
```

If port 4200 is already occupied:

```bash
npx ng serve --port 4300
```

---

# 🏗️ Build the Project

Run:

```bash
npx ng build
```

The build output will be generated inside:

```text
dist/
```

The current frontend build has been successfully verified.

---

# 🧪 Run Tests

```bash
npx ng test
```

---

# 🔀 Git Workflow

Before starting work:

```bash
git pull origin main
```

Create a feature branch:

```bash
git checkout -b feature/your-feature-name
```

Example:

```bash
git checkout -b feature/python-api-integration
```

After making changes:

```bash
git status
git add .
git commit -m "feat: connect dashboard API"
git push -u origin feature/python-api-integration
```

Then create a Pull Request on GitHub.

### Important

Avoid directly pushing experimental changes to `main`.

Use feature branches for backend/API integration and major changes.

---

# 👥 Team Handoff

The Angular frontend has already been established as the initial UI layer.

The next development phase should focus on connecting the existing frontend to the Python backend and AI pipeline.

### Frontend side

Already completed:

```text
UI
Routing
Pages
Layouts
Authentication screens
Notifications UI
Responsive structure
Component structure
Frontend build
```

### Backend / AI side

Next major work:

```text
Python setup
        ↓
API structure
        ↓
Database
        ↓
Authentication
        ↓
AI / Computer Vision
        ↓
Traffic processing
        ↓
API responses
        ↓
Angular integration
```

---

# 📌 Recommended Integration Order

To avoid connecting everything at once, integration should proceed in this order:

### 1. Backend foundation

* Python project setup
* Environment configuration
* Database
* API structure
* CORS

### 2. Authentication

* Signup API
* Login API
* JWT/session
* Forgot password
* Reset password
* User endpoint

### 3. Dashboard

Connect:

```text
Dashboard → Dashboard API
```

Replace static values with real data.

### 4. Violations

Connect:

```text
Violations → Violation API
```

### 5. Cameras

Connect:

```text
Cameras → Camera API
```

### 6. Analytics

Connect:

```text
Analytics → Analytics API
```

### 7. Reports

Connect:

```text
Reports → Reports API
```

### 8. Live Monitor

Connect camera/video processing and AI detection.

### 9. Notifications

Connect backend events to the existing notification component.

---

# ✦ Repository

GitHub:

**https://github.com/wh0-khushh/astraflow**

The repository currently contains the Angular frontend.

The `main` branch contains the verified frontend implementation.

---

# ✦ Current Development Phase

```text
┌───────────────────────────────┐
│       FRONTEND FOUNDATION     │
│             ✅ DONE           │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│       PYTHON BACKEND / AI     │
│           ⬜ NEXT             │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│       API INTEGRATION         │
│           ⬜ NEXT             │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│      REAL-TIME AI SYSTEM      │
│           ⬜ FINAL             │
└───────────────────────────────┘
```

---

# 🚦 Project Goal

AstraFlow is intended to evolve from a frontend dashboard into a complete AI-powered traffic intelligence platform capable of:

**Detecting → Tracking → Analyzing → Alerting → Reporting**

traffic activity in real time.

---

## AstraFlow

### Traffic Intelligence. Powered by AI. 🚦
