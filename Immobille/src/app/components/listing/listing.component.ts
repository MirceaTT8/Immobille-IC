
import { Component, OnInit } from '@angular/core';
import { Advertisement } from '../../interfaces/advertisement';
import { RouterLink} from "@angular/router";
import {PropertyService} from "../../services/property.service";
import {CommonModule} from "@angular/common";

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
  advertisements: Advertisement[] = [];

  filters: Advertisement = {
    id: "",
    type: "any",
    status: "for-sale",
    title: "",
    description: "",
    price: "",
    location: "",
    imageUrl: ""
  }

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.getProperties();
  }

  getProperties(): void {
    this.propertyService.getProperties(this.filters).subscribe(data => {
      this.advertisements
        = data;
    });
  }

  applyFilter<K extends keyof Advertisement>(filterType: K, value: Advertisement[K]): void {
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

  trackByDescription(index: number, advertisement: Advertisement): string {
    return advertisement.description;
  }

}
