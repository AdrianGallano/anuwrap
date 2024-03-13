import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavigationComponent } from '../../navigation/navigation.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editreport',
  standalone: true,
  imports: [RouterModule, NavigationComponent, CommonModule, FormsModule],
  templateUrl: './editreport.component.html',
  styleUrl: './editreport.component.css'
})
export class EditreportComponent {
  
  constructor(private router: Router){}
  goToReport(reportId: string) {
    this.router.navigate(['/report'])
  }
}

