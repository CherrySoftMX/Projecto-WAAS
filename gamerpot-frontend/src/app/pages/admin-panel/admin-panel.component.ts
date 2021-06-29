import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/_services/reports.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {}

  downloadAllComments() {
    this.reportsService.downloadAllCommentsReport().subscribe((data) => {
      this.downloadFile(data, 'comments.pdf');
    });
  }

  downloadAllUsers() {
    this.reportsService.downloadAllUsersReport().subscribe((data) => {
      this.downloadFile(data, 'users.pdf');
    });
  }

  downloadFile(data: Blob, fileName: string) {
    const downloadURL = window.URL.createObjectURL(data);
    const link = document.createElement('a');

    link.href = downloadURL;
    link.download = fileName;
    link.click();
  }
}
