import { Component } from '@angular/core';
import { RouterModule,Router } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  template: `
  <div class="navbar">
    <div class="logo">Immobille</div>
    <nav>
      <ul>
        <li><a routerLink="">Home</a></li>
        <li><a routerLink="/add">Add Advertisement</a></li>
        <li>
        <select (change)="navigate($event)" id="profileDropdown">
            <option value="/">Home</option>
            <option value="/profile">Profile</option>
            <option value="/login">Login</option>
            <option value="/register">Register</option>
        </select>
        </li>
      </ul>
    </nav>
  </div>
`,
  styleUrl: './header.component.css'
})
export class HeaderComponent {
    constructor(private router: Router) {}
  
    navigate(event: Event): void {
        const selectElement = event.target as HTMLSelectElement; 
        const url = selectElement.value;
        this.router.navigateByUrl(url);
      }
  }
