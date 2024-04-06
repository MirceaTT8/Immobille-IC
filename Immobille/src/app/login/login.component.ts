import { Component } from '@angular/core';
import {faFacebook} from '@fortawesome/free-brands-svg-icons'
import {faGoogle} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FontAwesomeModule],
  template: `
  <!-- <div class="background"></div> -->
  <section class="form-container">

            <form action="/login" method="post">
                <h3>welcome back!</h3>
                <input type="email" name="email" required maxlength="50" placeholder="enter your email" class="box">
                <input type="password" name="password" required maxlength="20" placeholder="enter your password" class="box">
                <p>don't have an account? <a href="register.html">register new</a></p>
                <input type="submit" value="login now" name="submit" class="btn">
            </form>

        </section>
`,
  styleUrl: '../register/register.component.css'
})
export class LoginComponent {
  facebookIcon = faFacebook;
  googleIcon = faGoogle;

}
