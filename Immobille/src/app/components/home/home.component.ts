import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
  <div class="mid">
    <div class="searchbar">
        <div class="fieldset">
            <label for="property-type-main" class="label1">I want to buy an/a:
                <select id="property-type-main" name="property-type-main">
                    <option value="">(select one)</option>
                    <option value="apartment">apartment</option>
                    <option value="house">house</option>
                    <option value="penthouse">penthouse</option>
                    <option value="terrain">terrain</option>
                </select>
            </label>

            <label for="status-main" class="label3">for:
                <select id="status-main" name="status-main">
                    <option value="for-sale">sale</option>
                    <option value="for-rent">rent</option>
                </select>
            </label>
            <a [routerLink]="['listing']">
                <button id="search">
                    Search
                </button>
            </a>
        </div>
    </div>
  </div>

`,
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
