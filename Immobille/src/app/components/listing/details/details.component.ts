import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
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
  // advertisement: Property | undefined;
  // imageObject: Array<object> = []; // Array to hold image objects for the slider
  //
  // constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}
  //
  // ngOnInit(): void {
  //   // Hardcoded property data
  //   this.advertisement = {
  //     id: '6650f1923cbad2379943d2c0',
  //     type: 'Apartment',
  //     status: 'for-sale',
  //     title: 'Beautiful Apartment in the City Center',
  //     description: 'A beautiful apartment located in the heart of the city, close to all amenities.',
  //     price: '300000',
  //     location: 'City Center',
  //     images: [
  //       {
  //         url: 'assets/house1.jpg',
  //         altText: 'Living room view',
  //       },
  //       {
  //         url: 'assets/house2.jpg',
  //         altText: 'Bedroom view',
  //       },
  //       {
  //         url: 'assets/house3.jpg',
  //         altText: 'Horse Dick View',
  //       }
  //     ],
  //     imageUrl: 'assets/house2.jpg',
  //     user: '6633885feb09ac5535c135cf'
  //   };
  //
  //   if (this.advertisement.images) {
  //     this.imageObject = this.advertisement.images.map((image: { url?: String; altText?: String | undefined; }) => ({
  //       image: image.url,
  //       thumbImage: image.url,
  //       alt: image.altText || 'Property Image',
  //     }));
  //     // Manually trigger change detection
  //     this.cdr.detectChanges();
  //     console.log(this.advertisement)
  //     console.log(this.advertisement.images)
  //   }
  // }
  advertisement: Property | undefined;
  imageObject: Array<object> = []; // Array to hold image objects for the slider

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
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
        console.log(this.advertisement)
        if (this.advertisement.images) {
          this.imageObject = this.advertisement.images.map((image: { url: String; altText?: String | undefined; }) => ({
            image: image.url,
            thumbImage: image.url,
            alt: image.altText || 'Property Image',
          }));


          console.log(this.imageObject[0]);
          this.cdr.detectChanges();
        }
      },
      error: (error) => {
        console.error('Error fetching property details', error);
      }
    });
  }


}
