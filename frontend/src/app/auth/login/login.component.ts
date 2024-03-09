import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LoginpopupComponent } from './loginpopup/loginpopup.component';
import { MatDialog } from '@angular/material/dialog';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog, private tokenService: TokenService) {}

  login() {
    this.authService.login(this.credentials).subscribe(
      response => {
        if (response.success) {
          console.log('Login successful:', response);
          console.log('Token received:', response.data.token); // Log the token here
          this.tokenService.setToken(response.data.token); // Store the received token
          console.log('Redirecting to workspace list...');
          this.router.navigateByUrl('/workspacelist');
        } else {
          console.error('Login error:', response);
          this.openloginErrorPopup();
        }
      },
      error => {
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
      console.log('The dialog was closed');
    });
  }
}
