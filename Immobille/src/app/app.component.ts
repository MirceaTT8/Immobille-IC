import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ListingComponent } from './listing/listing.component';
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
  ListingComponent],
  template: `
  <main>
    <app-header></app-header>
    <!-- <app-login></app-login> -->
    <!-- <app-register></app-register> -->
    <app-listing></app-listing>
    <app-footer></app-footer>
    
  </main>
`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Immobille';
}
