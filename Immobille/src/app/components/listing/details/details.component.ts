import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService} from "../../../services/property.service";
import { Property} from "../../../interfaces/property";
import { RouterLink} from "@angular/router";
import { CommonModule} from "@angular/common";
import {NgImageSliderModule} from "ng-image-slider";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    NgImageSliderModule

  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  // advertisement: Property | null = null;
  // imageObject: Array<object> = []; // Array to hold image objects for the slider
  //
  // constructor(
  //   private route: ActivatedRoute,
  //   private propertyService: PropertyService
  // ) {}
  //
  // ngOnInit(): void {
  //   this.route.paramMap.subscribe(params => {
  //     const propertyId = params.get('id');
  //     if (propertyId) {
  //       this.propertyService.getProperty(propertyId).subscribe({
  //         next: (data) => {
  //           this.advertisement = data;
  //           if (data.images) {
  //             this.imageObject = data.images.map(image => {
  //               return {
  //                 image: image.url,
  //                 thumbImage: image.url,
  //                 alt: image.altText || 'Property Image'
  //               };
  //             });
  //           }
  //         },
  //         error: (error) => {
  //           console.error('Error fetching property details', error);
  //         }
  //       });
  //     }
  //   });
  // }
  advertisement: Property | null = null;
  imageObject: Array<object> = []; // Array to hold image objects for the slider

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Hardcoded property for testing
    this.advertisement = {
      id: '1',
      type: 'House',
      status: 'For Sale',
      title: 'Beautiful Family Home',
      description: 'A beautiful family home located in a serene neighborhood.',
      price: '500000',
      location: '123 Main St, Anytown, USA',
      images: [
        {
          url: 'assets/house1.jpg',
          altText: 'Front view of the house'
        },
        {
          url: 'assets/house2.jpg',
          altText: 'Living room'
        },
        {
          url: 'assets/house3.jpg',
          altText: 'Backyard'
        }
      ],
      imageUrl: "",
      user: 'user_id'
    };

    if (this.advertisement.images) {
      this.imageObject = this.advertisement.images.map(image => ({
        image: image.url,
        thumbImage: image.url,
        alt: image.altText || 'Property Image'
      }));
      console.log(this.imageObject); // Verify the image objects
    }
  }
}
