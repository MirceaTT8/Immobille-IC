import { Component } from '@angular/core';
import {Router} from '@angular/router';
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
      price: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      imageUrl: new FormControl(null, Validators.required),
      image1: new FormControl(null, Validators.required),
      image2: new FormControl(null, Validators.required),
      image3: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    if (this.addAdvertisementForm.valid) {
      const formData = new FormData();
      const formValues = this.addAdvertisementForm.value;

      formData.append('type', formValues.type);
      formData.append('status', formValues.status);
      formData.append('title', formValues.title);
      formData.append('description', formValues.description);
      formData.append('price', formValues.price);
      formData.append('location', formValues.location);
      formData.append('images', (document.getElementById('imageUrl') as HTMLInputElement)?.files![0]);
      formData.append('images', (document.getElementById('image1') as HTMLInputElement)?.files![0]);
      formData.append('images', (document.getElementById('image2') as HTMLInputElement)?.files![0]);
      formData.append('images', (document.getElementById('image3') as HTMLInputElement)?.files![0]);
      console.log(formData)
      this.propertyService.addProperty(formData).subscribe({
        next: (response) => {
          console.log('Property added successfully', response);
          this.router.navigate(['/some-route']); // Navigate to some route after successful submission
        },
        error: (error) => {
          console.error('Error adding property', error);
        }
      });
    }
  }
}
