import { Component } from '@angular/core';
import {User} from "../../interfaces/user";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-ad-container',
  standalone: true,
  imports: [],
  templateUrl: './ad-container.component.html',
  styleUrl: './ad-container.component.css'
})
export class AdContainerComponent {
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
