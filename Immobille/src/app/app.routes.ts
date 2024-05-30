import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ListingComponent } from './components/listing/listing.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddAdvertisementComponent} from "./components/add-advertisement/add-advertisement.component";
import { DetailsComponent} from "./components/listing/details/details.component";
import {ProfileReviewComponent} from "./components/profile/profile-review/profile-review.component";

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
      },
      {
        path: 'add',
        component: AddAdvertisementComponent,
        title: 'Add Property'
      },
      {
        path: 'add/:id', // Add this route for updating property with an ID
        component: AddAdvertisementComponent,
        title: 'Update Property'
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Details Property'
      },
      {
        path: 'review/:userId',
        component: ProfileReviewComponent,
        title: 'User Review'
      }
 ];

 export default routeConfig;
