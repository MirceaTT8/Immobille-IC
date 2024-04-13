import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  template: `
    <div class = "container">
            <div class="profile">
                <h2>User Profile</h2>
                <div class="field">
                    <label for="name">Name: Ciro Immobille</label>
                    <span id="name"></span>
                </div>
                <div class="field">
                    <label for="email">Email: -</label>
                    <span id="email"></span>
                </div>
                <div class="field">
                    <label for="number">Phone Number: +4087594306780432</label>
                    <span id="number"></span>
                </div>
                <div class="field">
                    <button id="logoutButton">Logout</button>
                </div>
            </div>
        </div>

  `,
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
