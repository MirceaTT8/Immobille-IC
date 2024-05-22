import { Component, OnInit } from '@angular/core';
import { AuthService} from "../../../services/auth.service";
import {User} from "../../../interfaces/user";
import {Router} from '@angular/router';
@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.css'
})
export class ProfileInfoComponent implements OnInit{
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
