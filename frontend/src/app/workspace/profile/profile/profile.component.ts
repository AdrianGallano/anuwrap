import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from '../../navigation/navigation.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth/auth.service';
import { TokenService } from '../../../auth/token.service';

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
        console.log('Fetching user data...');
        const userId = this.authService.getUserIdFromToken(); // Retrieve user ID from token
        if (userId) {
            this.authService.getUserInformation(userId).subscribe(
                (response) => {
                    console.log('User data:', response); // Log the fetched user data
                    if (response.success && response.data && response.data.user) {
                        this.userData = response.data.user; // Assign user data
                        console.log('Assigned userData:', this.userData); // Log the assigned userData
                    } else {
                        console.error('Invalid user data structure:', response);
                    }
                },
                (error) => {
                    console.error('Error fetching user data:', error);
                }
            );
        } else {
            console.error('User ID not found in token.');
        }
    }
}    