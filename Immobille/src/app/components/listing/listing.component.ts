
import { Component } from '@angular/core';
import { Advertisement } from '../../interfaces/advertisement';
import {NgOptimizedImage} from "@angular/common";

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
  advertisements: Advertisement[];

  constructor() {
    this.advertisements = [
      {
        status: "For Sale",
        type: "House",
        title: "Elegant Family Home",
        description: "Spacious family home in a prestigious neighborhood. Perfect for growing families looking for a permanent residence close to top schools and amenities.",
        price: "$340,000",
        location: "Los Angeles, CA",
        imageUrl: "../../assets/house1.jpg"
      },
      {
        status: "For Rent",
        type: "Apartment",
        title: "Modern Downtown Apartment",
        description: "Luxurious and modern apartment with stunning city views, available for rent. Comes fully furnished with all the latest amenities.",
        price: "$1,950/month",
        location: "New York, NY",
        imageUrl: "../../assets/house2.jpg"
      },
      {
        status: "Lease",
        type: "Commercial",
        title: "Office Space Downtown",
        description: "Prime office space in the heart of the financial district. Ideal for startups and established companies alike.",
        price: "$2,800/month",
        location: "San Francisco, CA",
        imageUrl: "../../assets/house3.jpg"
      }
    ];
  }
}
