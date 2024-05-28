
import { Component, OnInit } from '@angular/core';
import { Property } from '../../interfaces/property';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {PropertyService} from "../../services/property.service";
import {AuthService} from "../../services/auth.service";
import {CommonModule} from "@angular/common";
import {User} from "../../interfaces/user";

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: "./listing.component.html",
  styleUrl: './listing.component.css'
})
export class ListingComponent implements OnInit {
  advertisements: Property[] = [];
  user: User | null = null;
  filtersHidden = true;

  toggleFilters() {
    this.filtersHidden = !this.filtersHidden;
  }

  filters: Property = {
    id: "",
    _id:"",
    type: "any",
    status: "for-sale",
    title: "",
    description: "",
    price: "",
    location: "",
    imageUrl: "",
    images: [],
    user: ''
  }

  constructor(private propertyService: PropertyService, private route: ActivatedRoute, private authService: AuthService,) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.filters.type = params['type'] || 'any';
      this.filters.status = params['status'] || 'for-sale';
      this.getProperties();
    });
    this.getUser();
  }

  getUser(): void {
    this.authService.getUser().subscribe(user => {
      this.user = user;
      console.log(this.user)
    }, error => {
      console.error('Error fetching user data:', error);
    });
  }

  getProperties(): void {
    this.propertyService.getProperties(this.filters).subscribe(data => {
      console.log('Received data:', data);
      if (Array.isArray(data)) {
        this.advertisements = data;
      } else {
        console.error('Expected an array of advertisements but received:', data);
        this.advertisements = [];
      }
    }, error => {
      console.error('Error fetching properties:', error);
      this.advertisements = [];
    });
  }

  saveProperty(propertyId: string): void {
    this.propertyService.saveProperty(propertyId).subscribe(response => {
      console.log('Property saved successfully:', response);
    }, error => {
      console.error('Error saving property:', error);
    });
  }

  applyFilter<K extends keyof Property>(filterType: K, value: Property[K]): void {
    console.log(`Applying filter: ${filterType} = ${value}`); // Log the filter being applied
    this.filters[filterType] = value;
    this.getProperties();
  }

  onStatusFilterChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.applyFilter('status', target.value === 'sale' ? 'for-sale' : 'for-rent');
  }

  onTypeFilterChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.applyFilter('type', target.value);
  }

  onLocationFilterChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.applyFilter('location', target.value);
  }

  getStatusDisplay(status: string): string {
    const statusMap: { [key: string]: string } = {
      'for-sale': 'For Sale',
      'for-rent': 'For Rent'
    };
    return statusMap[status.toLowerCase()] || status;
  }

  trackByDescription(index: number, advertisement: Property): string {
    return advertisement.description;
  }

  capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }


}
