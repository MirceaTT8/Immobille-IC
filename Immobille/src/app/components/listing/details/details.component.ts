import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService} from "../../../services/property.service";
import { Property} from "../../../interfaces/property";
import { RouterLink} from "@angular/router";
import { CommonModule} from "@angular/common";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule

  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  advertisement: Property | null = null;

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const propertyId = params.get('id');
      if (propertyId) {
        this.propertyService.getProperty(propertyId).subscribe({
          next: (data) => {
            this.advertisement = data;
          },
          error: (error) => {
            console.error('Error fetching property details', error);
          }
        });
      }
    });
  }

}
