import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { ListingComponent } from './components/listing/listing.component';
import { ProfileComponent } from './components/profile/profile.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports:
  [RouterOutlet,
  RouterModule,
  HomeComponent,
  FooterComponent,
  LoginComponent,
  RegisterComponent,
  HeaderComponent,
  ListingComponent,
  ProfileComponent],
  template: `
  <main>
    <app-header></app-header>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  </main>
`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Immobille';
}
