import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NavigationComponent } from "../../navigation/navigation.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { TokenService } from '../../../auth/token/token.service';
import { relative } from 'path';

@Component({
    selector: 'app-createreport',
    standalone: true,
    templateUrl: './createreport.component.html',
    styleUrls: ['./createreport.component.css'],
    imports: [RouterModule, NavigationComponent, CommonModule, FormsModule]
})
export class CreatereportComponent implements OnInit {
  reportTitle: string = '';
  description: string = '';
  content: string = '';
  reportTypeId: string = '';
  workspaceId: string = '';
  reportTypes: { report_type_id: number, name: string }[] = [];
  selectedReportType: number = 0;
  reportId: any;
  constructor(
      private authService: AuthService,
      private router: Router,
      private tokenService: TokenService,
      private aRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.fetchReportTypes();
    this.workspaceId = this.aRoute.snapshot.params['workspaceId'];
}

fetchReportTypes(): void {
   
}

  selectReportType(reportTypeId: number) {
      this.selectedReportType = reportTypeId;
  }

  createReport() {
      const userId = this.tokenService.getUserId();
      console.log(this.selectedReportType);
      console.log(this.workspaceId);
      console.log(userId);
      console.log(this.reportTitle);
      console.log(this.description);

      console.log('Workspace ID:', this.workspaceId); // Log the workspaceId

      const reportData = {
          reportType: this.selectedReportType,
          title: this.reportTitle,
          description: this.description,
          content: this.content,
          workspace_id: this.workspaceId,
          user_id: userId,
      };

      console.log(reportData);
      // Continue with the createReport logic
  }

  goToReports() {
    this.router.navigate(['../../report'], { relativeTo: this.aRoute })
  }
}