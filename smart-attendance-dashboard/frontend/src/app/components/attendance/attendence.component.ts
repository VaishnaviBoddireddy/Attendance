import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface AttendanceRecord {
  id: string;
  studentName: string;
  rollNumber: string;
  date: string;
  timeIn: string;
  status: 'Present' | 'Late' | 'Absent';
}

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent implements OnInit {
  selectedDate: string = new Date().toISOString().split('T')[0];
  selectedStatus: string = 'All';
  searchQuery: string = '';

  attendanceList: AttendanceRecord[] = [
    { id: '1', studentName: 'Alex Johnson', rollNumber: 'ST-101', date: this.selectedDate, timeIn: '08:55 AM', status: 'Present' },
    { id: '2', studentName: 'Samira Khan', rollNumber: 'ST-102', date: this.selectedDate, timeIn: '09:18 AM', status: 'Late' },
    { id: '3', studentName: 'Liam Miller', rollNumber: 'ST-103', date: this.selectedDate, timeIn: '08:50 AM', status: 'Present' },
    { id: '4', studentName: 'Emma Davis', rollNumber: 'ST-104', date: this.selectedDate, timeIn: '-', status: 'Absent' }
  ];

  ngOnInit(): void {}

  get filteredRecords(): AttendanceRecord[] {
    return this.attendanceList.filter(record => {
      const matchesSearch = record.studentName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            record.rollNumber.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesStatus = this.selectedStatus === 'All' || record.status === this.selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }

  get presentCount(): number {
    return this.attendanceList.filter(r => r.status === 'Present').length;
  }

  get lateCount(): number {
    return this.attendanceList.filter(r => r.status === 'Late').length;
  }

  get absentCount(): number {
    return this.attendanceList.filter(r => r.status === 'Absent').length;
  }

  updateStatus(record: AttendanceRecord, newStatus: 'Present' | 'Late' | 'Absent'): void {
    record.status = newStatus;
    if (newStatus === 'Absent') {
      record.timeIn = '-';
    } else if (record.timeIn === '-') {
      record.timeIn = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  }
}
