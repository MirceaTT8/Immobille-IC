import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
  <section>
    <form>
      <input type="text" placeholder="Filter by city">
      <button class="primary" type="button">Search</button>
      <select id="status-main" name="status-main">
        <option value="for-sale">sale</option>
        <option value="for-rent">rent</option>
      </select>
    </form>
  </section>
`,
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
