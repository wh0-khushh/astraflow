import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

/* =========================================================
   ASTRAFLOW — API SERVICE (integration layer)

   Thin HTTP wrapper for the future Python AI/CV backend.
   environment.apiUrl is intentionally EMPTY until the
   backend developer confirms host + routes.

   Proposed routes (NOT live — see traffic.models.ts header):
     /api/cameras, /api/traffic/summary, /api/traffic/flow,
     /api/violations, /api/notifications, /api/reports

   Until then TrafficDataService serves sample data from
   core/data/mock-data.ts and no request is ever sent.
   ========================================================= */

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) {}

  get isConfigured(): boolean {
    return !!environment.apiUrl;
  }

  get<T>(path: string, params?: { [key: string]: string }): Observable<T> {
    return this.http.get<T>(`${environment.apiUrl}${path}`, { params });
  }

  post<T>(path: string, body: unknown): Observable<T> {
    return this.http.post<T>(`${environment.apiUrl}${path}`, body);
  }

  patch<T>(path: string, body: unknown): Observable<T> {
    return this.http.patch<T>(`${environment.apiUrl}${path}`, body);
  }
}
