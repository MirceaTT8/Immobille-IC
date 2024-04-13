import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ListingComponent } from './components/listing/listing.component';
import { ProfileComponent } from './components/profile/profile.component';

const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home page'
      },
      {
        path: 'login',
        component: LoginComponent,
        title: 'Login details'
      },
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Register details'
      },
      {
        path: 'listing',
        component: ListingComponent,
        title: 'Listings'
      },
      {
        path: 'profile',
        component: ProfileComponent,
        title: 'Profile'
      }
 ];

 export default routeConfig;
