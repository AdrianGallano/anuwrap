import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from '../../navigation/navigation.component';
import { AuthService } from '../../../auth/auth.service';
import { CommonModule } from '@angular/common';

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
      const userId = 1; // Replace with the actual user ID
      this.fetchUserData(userId);
    }
  
    fetchUserData(userId: number): void {
      this.authService.getUserById(userId).subscribe(
        response => {
          this.userData = response.user; // Assuming user data is nested under 'user' property
        },
        error => {
          console.error('Error fetching user data:', error);
          // Handle error appropriately
        }
      );
    }
  }
  