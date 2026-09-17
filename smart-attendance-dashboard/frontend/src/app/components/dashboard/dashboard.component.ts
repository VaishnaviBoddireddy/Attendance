import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../../services/attendance.service';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [BaseChartDirective]
})
export class DashboardComponent implements OnInit {

  selectedHour = 'DBMS';
  selectedDate = '2026-09-17';

  // 1. Hourly Basis Chart Data
  public hourlyChartLabels: string[] = ['DBMS Class'];
  public hourlyChartData: ChartDataset[] = [
    { data: [0], label: 'Present Students', backgroundColor: '#2ecc71' },
    { data: [0], label: 'Absent Students', backgroundColor: '#e74c3c' }
  ];

  // 2. Weekly & Monthly Average Bar Graph Data
  public summaryChartLabels: string[] = ['Batch Average'];
  public summaryChartData: ChartDataset[] = [
    { data: [0], label: 'Avg Present', backgroundColor: '#3498db' },
    { data: [0], label: 'Avg Absent', backgroundColor: '#f1c40f' }
  ];

  public chartOptions: ChartOptions = { responsive: true };
  public chartType: ChartType = 'bar';

  constructor(private attendanceService: AttendanceService) {}

  ngOnInit(): void {
    this.updateHourlyGraph();
    this.loadSummaryGraph('2026-09-01', '2026-09-17');
  }

  updateHourlyGraph(): void {
    this.attendanceService.getHourlyAnalytics(this.selectedDate, this.selectedHour).subscribe(data => {
      this.hourlyChartLabels = [`${data.hourName} (${this.selectedDate})`];
      this.hourlyChartData[0].data = [data.present];
      this.hourlyChartData[1].data = [data.absent];
    });
  }

  loadSummaryGraph(startDate: string, endDate: string): void {
    this.attendanceService.getSummaryAnalytics(startDate, endDate).subscribe(data => {
      this.summaryChartData[0].data = [data.averagePresent];
      this.summaryChartData[1].data = [data.averageAbsent];
    });
  }
}
