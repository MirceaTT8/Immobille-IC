import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService} from "../../../services/property.service";
import {AuthService} from "../../../services/auth.service";
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
