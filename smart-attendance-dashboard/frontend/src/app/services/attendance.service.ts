import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  submitQrScan(qrData: { hourName: string; date: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/attendance/scan`, qrData, {
      headers: this.getAuthHeaders()
    });
  }

  requestCorrection(payload: { studentRollNumber: string; hourName: string; date: string; newStatus: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/attendance/correct`, payload, {
      headers: this.getAuthHeaders()
    });
  }

  getHourlyAnalytics(date: string, hourName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/analytics/hourly?date=${date}&hourName=${hourName}`);
  }

  getSummaryAnalytics(startDate: string, endDate: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/analytics/summary?startDate=${startDate}&endDate=${endDate}`);
  }
}
