import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit {
  // Placeholder for the individual student record
  studentRecord = {
    id: 'STU-2026-001',
    name: 'Alex Johnson',
    role: 'Student',
    totalAttendancePercentage: 92,
    totalLateEntries: 3
  };

  recentCheckIns = [
    { date: '2026-09-17', status: 'Present', scanMethod: 'QR Scanner', time: '08:45 AM' },
    { date: '2026-09-16', status: 'Late', scanMethod: 'QR Scanner', time: '09:15 AM' },
    { date: '2026-09-15', status: 'Present', scanMethod: 'Admin Override', time: '08:50 AM' }
  ];

  ngOnInit(): void {
    // Initialization logic, such as fetching the student record from your Node.js/Express backend
  }
}
