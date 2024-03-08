import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LoginpopupComponent } from './loginpopup/loginpopup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) {}

  login() {
    this.authService.login(this.credentials).subscribe(
      response => {
        // Handle successful login response
        console.log('Login successful:', response);
         // Extract the token from the response body
         const token = response.token;
         // Store the token in local storage
         localStorage.setItem('token', token);
        this.router.navigateByUrl('/workspacelist');
      },
      error => {
        // Handle login error
        console.error('Login error:', error);
        this.openloginErrorPopup();
      }
    );
  }
  openloginErrorPopup(): void {
    const dialogRef = this.dialog.open(LoginpopupComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The diaglog was closed');
    })
  }
}
