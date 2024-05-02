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
      type: new FormControl('', Validators.required),
      status: new FormControl('for-sale', Validators.required),
      title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      // area: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      imageUrl: new FormControl(null, Validators.required)
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
