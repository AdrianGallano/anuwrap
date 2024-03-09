import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [RouterModule, FormsModule],
    providers: [
      HttpClientModule, // Add HttpClientModule here
      { provide: HttpClient, useFactory: fetchFactory }
    ]
  })
  export class AppComponent {
    title = 'frontend';
  }
  
  export function fetchFactory() {
    return fetch.bind(window);
  }