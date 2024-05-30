import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NgImageSliderModule} from "ng-image-slider";
import {Property} from "../../../../interfaces/property";
import {ActivatedRoute} from "@angular/router";
import {PropertyService} from "../../../../services/property.service";

@Component({
  selector: 'app-my-announcements-details',
  standalone: true,
  imports: [
    NgImageSliderModule
  ],
  templateUrl: './my-announcements-details.component.html',
  styleUrl: './my-announcements-details.component.css'
})
export class MyAnnouncementsDetailsComponent implements OnInit {
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
