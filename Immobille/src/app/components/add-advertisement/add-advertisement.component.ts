import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {RouterLink} from "@angular/router";
import {RouterModule} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { PropertyService} from "../../services/property.service";

@Component({
  selector: 'app-add-advertisement',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './add-advertisement.component.html',
  styleUrl: './add-advertisement.component.css'
})
export class AddAdvertisementComponent {
  addAdvertisementForm: FormGroup;

  constructor(private propertyService: PropertyService, private router: Router) {
    this.addAdvertisementForm = new FormGroup({
      type: new FormControl('', Validators.required), // Radio buttons for property type
      status: new FormControl('for-sale', Validators.required), // Radio buttons for status, with default value
      title: new FormControl('', [Validators.required, Validators.maxLength(100)]), // Input for title
      description: new FormControl('', [Validators.required, Validators.maxLength(500)]), // Textarea for description
      // area: new FormControl('', [Validators.required]), // Input for area, expects only numbers
      price: new FormControl('', [Validators.required]), // Input for price, expects only numbers
      location: new FormControl('', [Validators.required, Validators.maxLength(200)]), // Input for location
      imageUrl: new FormControl(null, Validators.required) // File input for images, requires at least one image
    });
  }

  onSubmit() {
    if (this.addAdvertisementForm.valid) {
      this.propertyService.addProperty(this.addAdvertisementForm.value).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
        },
        error: (error) => {
          console.error('Registration failed', error);
        }
      });
    }
  }
}
