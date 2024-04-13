import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router } from "@angular/router";
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule
  ],
  template: `
    <section class="form-container">
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <h3>Create an account!</h3>
        <input type="text" formControlName="username" required maxlength="50" placeholder="Enter your name" class="box">
        <input type="email" formControlName="email" required maxlength="50" placeholder="Enter your email" class="box">
        <input type="password" formControlName="password" required maxlength="20" placeholder="Enter your password" class="box">
        <p>Already have an account? Login now</p>
        <input type="submit" value="Register now" class="btn">
      </form>
    </section>
  `,
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.registerForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      email: new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(50)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          // Navigate to some route upon success
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration failed', error);
        }
      });
    }
  }
}
