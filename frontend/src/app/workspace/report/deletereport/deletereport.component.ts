import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { NavigationComponent } from '../../navigation/navigation.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-deletereport',
  standalone: true,
  imports: [RouterModule, NavigationComponent, CommonModule, FormsModule],
  templateUrl: './deletereport.component.html',
  styleUrl: './deletereport.component.css'
})
export class DeletereportComponent implements OnInit {
  reportId: any;
  report: any = {};
  constructor(private route: Router, private aRoute: ActivatedRoute, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.reportId = params["params"]["report_id"];
    });

    this.fetchReport();
  }

  goToReports() {
    this.route.navigate(['../../report'], { relativeTo: this.aRoute })
  }

  deleteReport(): void {
    if (this.reportId) {
      this.authService.deleteReport(this.reportId).subscribe(
        (response) => {
          this.route.navigate(["../../report"], { relativeTo: this.aRoute });
        },
        (error) => {
          console.error('Error deleting workspace:', error);
        }
      );
    } else {
      console.error('Workspace ID is missing.');
    }
  }

  fetchReport() {
    this.authService.getReport(this.reportId).subscribe(
      (response) => {
        this.report = response.data.report
      },
      (error) => {
        console.log("This", error);
      }
    )
  }
}
