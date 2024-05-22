import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FormsModule],
  template: `
  <div class="mid">
    <div class="searchbar">
        <div class="fieldset">
            <label for="property-type-main" class="label1">I want to buy an/a:
                <select id="property-type-main" name="property-type-main" [(ngModel)]="filters.type">
                    <option value="">(select one)</option>
                    <option value="apartment">apartment</option>
                    <option value="house">house</option>
                    <option value="penthouse">penthouse</option>
                    <option value="terrain">terrain</option>
                </select>
            </label>

            <label for="status-main" class="label3">for:
                <select id="status-main" name="status-main" [(ngModel)]="filters.status">
                    <option value="for-sale">sale</option>
                    <option value="for-rent">rent</option>
                </select>
            </label>
          <button id="search" (click)="search()">
                    Search
          </button>
        </div>
    </div>
  </div>

`,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  filters = {
    type: '',
    status: 'for-sale'
  };

  constructor(private router: Router) {}

  search(): void {
    this.router.navigate(['/listing'], { queryParams: this.filters });
  }
}
