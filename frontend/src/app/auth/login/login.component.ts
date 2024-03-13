import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { TokenService } from '../token/token.service';
import { Token } from '@angular/compiler';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = { email: '', password: '' };
  error = "";
  constructor(private authService: AuthService, private router: Router, private tokenService: TokenService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()?.length !== 0) {
      this.router.navigate(["/workspacelist"]); 
    }
  }

  login() {
    this.authService.login(this.credentials).subscribe(
      (response: any) => {
        const token = response.data.token;
        const userId = response.data.user_id;


        this.tokenService.setAuthorization(token, userId);

        this.router.navigate(['../workspacelist']);
      },
      (error: HttpErrorResponse) => {
        this.error = error.error.errors;
      }
    );
  }
}