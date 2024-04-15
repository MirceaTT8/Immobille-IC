import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import {Router} from '@angular/router';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  template:`
    <div class="container">
      <div class="profile">
        <h2>User Profile</h2>
        <div class="field">
          <label>Name:</label>
          <span>{{ user?.name }}</span>
        </div>
        <div class="field">
          <label>Email:</label>
          <span>{{ user?.email }}</span>
        </div>
        <div class="field">
          <button id="logoutButton" (click)="logout()" >Logout</button>
        </div>
      </div>
    </div>
  `,
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService, private router:Router) {}

  ngOnInit() {
    this.authService.getUser().subscribe({
      next: (userData) => {
        this.user = userData;
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      }
    });
  }
  logout() {
      this.authService.logout().subscribe({
        next: (response) => {
          console.log('Logout successful', response);
          this.router.navigate(['login']);
        },
        error: (error) => {
          console.error('Logout failed', error);
        }
      });
    }
}
