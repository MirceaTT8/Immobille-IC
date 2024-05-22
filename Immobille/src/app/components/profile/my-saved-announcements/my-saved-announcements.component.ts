import {Component, OnInit} from '@angular/core';
import {User} from "../../../interfaces/user";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-my-saved-announcements',
  standalone: true,
  imports: [],
  templateUrl: './my-saved-announcements.component.html',
  styleUrl: './my-saved-announcements.component.css'
})
export class MySavedAnnouncementsComponent implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (error) => {
        console.error('Error fetching properties', error);
      }
    });
  }
}
