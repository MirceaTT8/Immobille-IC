import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from "../../../services/property.service";
import { AuthService } from "../../../services/auth.service";
import { Property } from "../../../interfaces/property";
import { RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NgImageSliderModule } from "ng-image-slider";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    NgImageSliderModule
  ],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  advertisement: Property | undefined;
  user: any; // to hold user details
  imageObject: Array<object> = []; // Array to hold image objects for the slider

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private authService: AuthService, // inject AuthService
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const propertyId = params.get('id');
      if (propertyId) {
        this.getProperty(propertyId);
      }
    });
  }

  getProperty(propertyId: string): void {
    this.propertyService.getProperty(propertyId).subscribe({
      next: (data) => {
        this.advertisement = data;
        console.log(this.advertisement);
        if (this.advertisement?.userId) {
          this.getUserById(this.advertisement.userId);
        }
        if (this.advertisement.images) {
          this.imageObject = this.advertisement.images.map((image: { url: String; altText?: String | undefined; }) => ({
            image: image.url,
            thumbImage: image.url,
            alt: image.altText || 'Property Image',
          }));
          this.cdr.detectChanges();
        }
      },
      error: (error) => {
        console.error('Error fetching property details', error);
      }
    });
  }

  getUserById(userId: string): void {
    this.authService.getUserById(userId).subscribe({
      next: (userData) => {
        this.user = userData;
        console.log(this.user);
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      }
    });
  }

  getStatusDisplay(status: string): string {
    const statusMap: { [key: string]: string } = {
      'for-sale': 'For Sale',
      'for-rent': 'For Rent'
    };
    return statusMap[status.toLowerCase()] || status;
  }

  capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
}
