import { Component } from '@angular/core';
import {RouterOutlet, RouterModule, NavigationEnd, Router} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { ListingComponent } from './components/listing/listing.component';
import { ProfileComponent } from './components/profile/profile.component';
import {filter} from "rxjs";
import {CommonModule} from "@angular/common";
@Component({
  selector: 'app-root',
  standalone: true,
  imports:
  [RouterOutlet,
  RouterModule, CommonModule,
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
    <app-footer *ngIf="showFooter"></app-footer>
  </main>
`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Immobille';
  showFooter = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.showFooter = !event.url.includes('/profile');
      });
  }
}
