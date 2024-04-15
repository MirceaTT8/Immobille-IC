import { Component } from '@angular/core';
import {faFacebook} from '@fortawesome/free-brands-svg-icons'
import {faGoogle} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {Router, RouterLink} from '@angular/router';
import {FormControl, FormGroup, Validators, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, ReactiveFormsModule],
  template: `
    <section class="form-container">

      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <h3>welcome back!</h3>
        <input type="email" formControlName="email" required maxlength="50" placeholder="Enter your email" class="box">
        <input type="password" formControlName="password" required maxlength="20" placeholder="Enter your password" class="box">
        <p>don't have an account? <a [routerLink]="['../register']">register new</a></p>
       <input type="submit" value="Login now" name="submit" class="btn">
      </form>

    </section>
  `,
  styleUrl: '../register/register.component.css'
})
export class LoginComponent {
  facebookIcon = faFacebook;
  googleIcon = faGoogle;

  loginForm: FormGroup;

  constructor(private authService:AuthService, private router:Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(50)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.router.navigate(['profile']);
        },
        error: (error) => {
          console.error('Login failed', error);
        }
      });
    }
  }

}
