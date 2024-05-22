import {Component, OnInit} from '@angular/core';
import { User } from "../../../interfaces/user";
import { AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-my-announcements',
  standalone: true,
  imports: [],
  templateUrl: './my-announcements.component.html',
  styleUrl: './my-announcements.component.css'
})
export class MyAnnouncementsComponent implements OnInit  {
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
