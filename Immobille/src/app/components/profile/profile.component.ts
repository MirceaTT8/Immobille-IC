import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
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
          <button id="logoutButton">Logout</button>
        </div>
      </div>
    </div>
  `,
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService) {}

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
}
