import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, Params } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-reportitem',
  standalone: true,
  imports: [],
  templateUrl: './reportitem.component.html',
  styleUrl: './reportitem.component.css'
})
export class ReportitemComponent implements OnInit {
  reportId: any;
  report: any = {

  }

  constructor(
    private route: Router,
    private authService: AuthService,
    private aRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.reportId = params["params"]["report_id"];
    });
    this.fetchReport();
  }

  fetchReport() {
    this.authService.getReport(this.reportId).subscribe(
      (response) => {
        this.report = response.data.report
        console.log(this.report)
      },
      (error) => {
        console.log("This", error);
      }
    )
  }
}
