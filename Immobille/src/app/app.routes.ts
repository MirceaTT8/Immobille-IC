import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ListingComponent } from './listing/listing.component';
import { ProfileComponent } from './profile/profile.component';

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