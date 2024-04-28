
import { Component } from '@angular/core';
import { Advertisement } from '../../interfaces/advertisement';
import {NgOptimizedImage} from "@angular/common";
import {PropertyService} from "../../services/property.service";

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  template:`
    <div id="main">
      <form id="filter-form">
        <label for="price-min">Minimum Price:</label>
        <input type="number" id="price-min" name="price-min" placeholder="Min Price" value="0">
        <label for="price-max">Maximum Price:</label>
        <input type="number" id="price-max" name="price-max" placeholder="Max Price" value="100000000">

        <label>Property Type:</label>
        <select id="property-type" name="property-type">
          <option value="any">Any</option>
          <option value="house">House</option>
          <option value="penthouse">Penthouse</option>
          <option value="apartment">Apartment</option>
          <option value="terrain">Terrain</option>
        </select>

        <label>Location:</label>
        <select id="location" name="location">
          <option value="any">Any</option>
          <option value="cluj">Cluj</option>
          <option value="timisoara">Timisoara</option>
          <option value="bucharest">Bucharest</option>
          <option value="other">Other</option>
        </select>

        <label for="for-sale">For Sale</label>
        <input type="radio" id="for-sale" name="sale-or-rent" value="sale" checked="checked">
        <label for="for-rent">For Rent:</label>
        <input type="radio" id="for-rent" name="sale-or-rent" value="rent">
        <button type="submit">Apply Filter</button>
      </form>

      <ul class="announcement-list" id="ads-list">
        @for (advertisement of advertisements; track advertisement.description) {
        <li class="announcement">
          <img [src]="advertisement.imageUrl" alt="Property Image">
          <div class="announcement-details">
            <p class="status">{{ advertisement.status }}</p>
            <p class="property-type">{{ advertisement.type }}</p>
            <h2>{{ advertisement.title }}</h2>
            <p>{{ advertisement.description }}</p>
            <p class="price">Price: {{ advertisement.price }}</p>
            <p class="location">{{ advertisement.location }}</p>
          </div>
        </li>
        }
      </ul>
    </div>
  `,
  styleUrl: './listing.component.css'
})
export class ListingComponent {
  advertisements: Advertisement[] = [];

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.propertyService.getAllProperties().subscribe({
      next: (data) => {
        this.advertisements = data;
      },
      error: (error) => {
        console.error('Error fetching properties', error);
      }
    });
  }
}
