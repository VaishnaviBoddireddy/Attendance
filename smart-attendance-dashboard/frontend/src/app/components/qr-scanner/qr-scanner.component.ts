import { Component, OnInit } from '@angular/core';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { AttendanceService } from '../../services/attendance.service';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class QrScannerComponent implements OnInit {
  scanMessage = '';
  isError = false;

  correctionRoll = '';
  correctionSubject = 'DBMS';
  correctionDate = '2026-09-17';
  correctionStatus = 'Corrected';

  constructor(private attendanceService: AttendanceService) {}

  ngOnInit(): void {
    const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 }, false);
    scanner.render(this.onScanSuccess.bind(this), this.onScanError.bind(this));
  }

  onScanSuccess(decodedText: string): void {
    try {
      const qrData = JSON.parse(decodedText);

      this.attendanceService.submitQrScan(qrData).subscribe({
        next: (res) => {
          this.isError = false;
          this.scanMessage = res.message;
        },
        error: (err) => {
          this.isError = true;
          this.scanMessage = err.error?.message || 'Scanning processing error.';
        }
      });
    } catch (e) {
      this.isError = true;
      this.scanMessage = 'Unrecognized QR code layout.';
    }
  }

  onScanError(error: any): void {
    // Ignore frame parsing errors
  }

  applyCorrection(): void {
    const payload = {
      studentRollNumber: this.correctionRoll,
      hourName: this.correctionSubject,
      date: this.correctionDate,
      newStatus: this.correctionStatus
    };

    this.attendanceService.requestCorrection(payload).subscribe({
      next: (res) => {
        this.isError = false;
        this.scanMessage = res.message;
      },
      error: (err) => {
        this.isError = true;
        this.scanMessage = err.error?.message || 'Correction failed.';
      }
    });
  }
}
