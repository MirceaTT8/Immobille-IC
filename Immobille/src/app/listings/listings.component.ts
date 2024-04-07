import { Component } from '@angular/core';

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [],
  template: `
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
                <input type="radio" id="for-sale" name="sale-or-rent" value="sale" checked="true">
                <label for="for-rent">For Rent:</label>
                <input type="radio" id="for-rent" name="sale-or-rent" value="rent">
                <button type="submit">Apply Filter</button>
            </form>

        <ul class="announcement-list" id="ads-list">
          <li class="announcement">
            <img src="../../assets/house1.jpg" alt="Property Image">
            <div class="announcement-details">
              <p class="status">For Sale</p>
              <p class="property-type">House</p>
              <h2>Elegant Family Home</h2>
              <p>Spacious family home in a prestigious neighborhood. Perfect for growing families looking for a permanent residence close to top schools and amenities.</p>
              <p class="price">Price: $340,000</p>
              <p class="location">Los Angeles, CA</p>
            </div>
          </li>
          <li class="announcement">
            <img src="../../assets/house2.jpg" alt="Property Image">
            <div class="announcement-details">
              <p class="status">For Rent</p>
              <p class="property-type">Apartment</p>
              <h2>Modern Downtown Apartment</h2>
              <p>Luxurious and modern apartment with stunning city views, available for rent. Comes fully furnished with all the latest amenities.</p>
              <p class="price">Price: $1,950/month</p>
              <p class="location">New York, NY</p>
            </div>
          </li>
          <li class="announcement">
            <img src="../../assets/house3.jpg" alt="Property Image">
            <div class="announcement-details">
              <p class="status">Lease</p>
              <p class="property-type">Commercial</p>
              <h2>Office Space Downtown</h2>
              <p>Prime office space in the heart of the financial district. Ideal for startups and established companies alike.</p>
              <p class="price">Price: $2,800/month</p>
              <p class="location">San Francisco, CA</p>
            </div>
          </li>
        </ul>
  </div>
  `,
  styleUrl: './listings.component.css'
})
export class ListingsComponent {

}
