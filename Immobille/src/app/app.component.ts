import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ListingsComponent } from './listings/listings.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: 
  [RouterOutlet,
  HomeComponent,
  FooterComponent,
  LoginComponent,
  RegisterComponent,
  HeaderComponent,
  ListingsComponent],
  template: `
  <main>
    <app-header></app-header>
    <!-- <app-login></app-login> -->
    <!-- <app-register></app-register> -->
    <app-listings></app-listings>
    <app-footer></app-footer>
    
  </main>
`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Immobille';
}
