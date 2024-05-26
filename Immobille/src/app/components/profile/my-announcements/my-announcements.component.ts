import {Component, OnInit} from '@angular/core';
import { User } from "../../../interfaces/user";
import { AuthService} from "../../../services/auth.service";
import {PropertyService} from "../../../services/property.service";
import {Property} from "../../../interfaces/property";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-my-announcements',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './my-announcements.component.html',
  styleUrl: './my-announcements.component.css'
})
export class MyAnnouncementsComponent implements OnInit  {
  user: User | null = null;

  constructor(private authService: AuthService, private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe({
      next: (data) => {
        this.user = data;
        console.log(data);
      },
      error: (error) => {
        console.error('Error fetching properties', error);
      }
    });
  }

  deleteProperty(propertyId: any): void {
    this.propertyService.deleteProperty(propertyId).subscribe({
      next: (response) => {
        console.log('Property deleted successfully', response);
        if (this.user) {
          this.user.properties = this.user.properties.filter(property => property._id !== propertyId);
        }
      },
      error: (error) => {
        console.error('Error deleting property', error);
      }
    });
  }

  trackByDescription(index: number, advertisement: Property): string {
    return advertisement.description;
  }

}
