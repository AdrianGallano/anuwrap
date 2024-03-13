import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { ActivatedRoute, Router, RouterModule, Params } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { TokenService } from '../../auth/token/token.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { report } from 'process';

@Component({
  selector: 'app-report',
  standalone: true,
  templateUrl: './report.component.html',
  styleUrl: './report.component.css',
  imports: [RouterModule, NavigationComponent, NavbarComponent, FormsModule, CommonModule,]
})
export class ReportComponent implements OnInit {
  reports: any[] = [];
  workspaceId = '';

  constructor(
    private authService: AuthService,
    private route: Router,
    private aRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.workspaceId = params["params"]["workspace_id"];
    });
    this.fetchReports();
  }

/*   fetchReportTypes(): void {
    this.authService.getReportType().subscribe(
      (response) => {
        this.reportTypes = response.data
        console.log(this.reportTypes)
      },
      (error) => {
        console.log(error);
      }
    )
  } */
  openReport(reportId: any): void {
    console.log("this")
    this.route.navigate([`../report/${reportId}`], { relativeTo: this.aRoute });
  }

  navigateToCreateReport() {
    this.route.navigate(['../createreport'], { relativeTo: this.aRoute });
  }

  navigateToEditReport(reportId: any) {
    this.route.navigate([`../editreport/${reportId}`], { relativeTo: this.aRoute });
  }

  navigateToDeleteReport(reportId: any) {
    this.route.navigate([`../deletereport/${reportId}`], { relativeTo: this.aRoute });
  }

  fetchReports() {
    this.authService.getReports(this.workspaceId).subscribe(
      (response) => {
        this.reports = response.data.report
        console.log(this.reports)
      },
      (error) => {
        console.log(error);
      }
    )
  }
}