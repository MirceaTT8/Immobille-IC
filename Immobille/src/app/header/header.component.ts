import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template: `
  <div class="navbar">
    <div class="logo">Immobille</div>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="add.html">Add Advertisement</a></li>
                <li>
                    <select id="profileDropdown" onchange="redirectToSelectedOption(this)">
                        <option value="">Home</option>
                        <option value="profile.html">Profile</option>
                        <option value="login.html">Login</option>
                        <option value="register.html">Register</option>
                        <option value="myads.html">My Ads</option>
                    </select>
                </li>
            </ul>
    </nav>
</div>

`,
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
