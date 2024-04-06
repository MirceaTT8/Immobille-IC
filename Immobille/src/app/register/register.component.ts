import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  template: `
          <section class="form-container">
            <form action="/register" method="post">
                <h3>create an account!</h3>
                <input type="tel" name="name" required maxlength="50" placeholder="enter your name" class="box">
                <input type="email" name="email" required maxlength="50" placeholder="enter your email" class="box">
                <input type="password" name="password" required maxlength="20" placeholder="enter your password" class="box">
                <input type="password" name="c_password" required maxlength="20" placeholder="confirm your password" class="box">
                <input type="tel" id="phone" name="phone"  required maxlength="20" placeholder="enter your phone number" class="box" >
                <p>already have an account? <a href="login.html">login now</a></p>
                <input type="submit" value="register now" name="submit" class="btn">
            </form>
          </section>
`,
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
