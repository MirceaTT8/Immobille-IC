import { Component } from '@angular/core';
import {faFacebook} from '@fortawesome/free-brands-svg-icons'
import {faGoogle} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

import { RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FontAwesomeModule,RouterLink, RouterOutlet, RouterModule],
  template: `
  <!-- <div class="background"></div> -->
  <section class="form-container">

            <form action="/login" method="post">
                <h3>welcome back!</h3>
                <input type="email" name="email" maxlength="50" placeholder="enter your email" class="box">
                <input type="password" name="password" maxlength="20" placeholder="enter your password" class="box">
                <p>don't have an account? <a [routerLink]="['../register']">register new</a></p>
                <a [routerLink]="['../listing']"><input type="submit" value="login now" name="submit" class="btn"></a>
            </form>

        </section>
`,
  styleUrl: '../register/register.component.css'
})
export class LoginComponent {
  facebookIcon = faFacebook;
  googleIcon = faGoogle;

}
