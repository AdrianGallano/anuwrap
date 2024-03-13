import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { OnInit } from '@angular/core';
import { getLocaleDateFormat } from '@angular/common';
import { TokenService } from '../../auth/token/token.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit {
  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      initFlowbite();
    } 

    this.getData();
  }

  user = {
    username: "",
    firstname: "",
    lastname: "",
    email: ""
  };

  constructor(private authService: AuthService) { }

  getData(): void {
    this.authService.getUserInformation().subscribe(
      (response) => {
        this.user.username = response.data.user.username;
        this.user.firstname = response.data.user.first_name;
        this.user.lastname = response.data.user.last_name;
        this.user.email = response.data.user.email;
      },
      (error) => {
        console.error('Error fetching user information:', error);
      }
    );
  }
}
