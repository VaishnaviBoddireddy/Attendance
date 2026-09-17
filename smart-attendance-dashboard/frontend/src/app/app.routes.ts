import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'students',
    loadComponent: () => import('./components/students/students.component').then(m => m.StudentsComponent)
  },
  {
    path: 'attendance',
    loadComponent: () => import('./components/attendance/attendance.component').then(m => m.AttendanceComponent)
  },
  {
    path: 'qr-scanner',
    loadComponent: () => import('./components/qr-scanner/qr-scanner.component').then(m => m.QrScannerComponent)
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
