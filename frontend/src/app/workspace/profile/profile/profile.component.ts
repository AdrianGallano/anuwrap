import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from '../../navigation/navigation.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth/auth.service';

@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    imports: [RouterModule, NavigationComponent, CommonModule]
})
export class ProfileComponent implements OnInit {
    userData: any;
  
    constructor(private authService: AuthService) { }
  
    ngOnInit(): void {
      this.fetchUserData();
    }
  
    fetchUserData() {
      this.authService.getUser().subscribe(
        (data) => {
          // Handle successful response
          this.userData = data;
        },
        (error) => {
          // Handle error
          console.error('Error fetching user data:', error);
        }
      );
    }
  }