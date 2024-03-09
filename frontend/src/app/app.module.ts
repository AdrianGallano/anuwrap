import { ApplicationRef, NgModule } from '@angular/core';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './approutingmodule/app.router.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RegisterComponent } from './auth/register/register.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth/auth.service';

@NgModule({
  declarations: [RegisterComponent, LoginComponent], 
  imports: [
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [] // Remove AppComponent from bootstrap array
})
export class AppModule {
  ngDoBootstrap(appRef: ApplicationRef) {
    appRef.bootstrap(AppComponent); // Bootstrap the AppComponent dynamically
  }
}
