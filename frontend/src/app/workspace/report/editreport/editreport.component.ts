import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
  reportId: any;
  
  constructor(private router: Router, private aRoute: ActivatedRoute){}

  editReport() {
    
  }
  goToReports() {
    this.router.navigate(['../../report'], { relativeTo: this.aRoute })
  }
}

