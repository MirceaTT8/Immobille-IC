import {Component, OnInit} from '@angular/core';
import {User} from "../../../interfaces/user";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    FormsModule,ReactiveFormsModule,CommonModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
  userForm!: FormGroup;
  user: User = {
    _id: '',
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    properties: [],
    savedAnnouncements: [],
    reviews: []
  };

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      phoneNumber: ['']
    });

    this.authService.getUser().subscribe({
      next: (userData) => {
        this.user = userData;
        this.userForm.patchValue({
          name: this.user.name,
          phoneNumber: this.user.phoneNumber
        });
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      }
    });
  }

  updateUser() {
    if (this.userForm.valid) {
      const updatedUserData = {
        ...this.user,
        ...this.userForm.value
      };

      this.authService.updateUser(updatedUserData._id, updatedUserData).subscribe({
        next: (updatedUser) => {
          console.log('User updated successfully:', updatedUser);
        },
        error: (err) => {
          console.error('Error updating user data:', err);
        }
      });
    }
  }

}
