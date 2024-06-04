import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../interfaces/property';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-add-advertisement',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-advertisement.component.html',
  styleUrls: ['./add-advertisement.component.css']
})
export class AddAdvertisementComponent implements OnInit {
  addAdvertisementForm: FormGroup;
  propertyId: string | null = null;

  // Image URLs for preview
  mainImageUrl: string | null = null;
  image1Url: string | null = null;
  image2Url: string | null = null;
  image3Url: string | null = null;

  constructor(
    private propertyService: PropertyService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.addAdvertisementForm = new FormGroup({
      type: new FormControl('', Validators.required),
      status: new FormControl('for-sale', Validators.required),
      title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      price: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      cif: new FormControl('', [Validators.required, Validators.maxLength(20)]) // Ensure this is defined correctly
    });
  }

  ngOnInit(): void {
    console.log(this.addAdvertisementForm); // Log the form group
    this.route.paramMap.subscribe(params => {
      this.propertyId = params.get('id');
      if (this.propertyId) {
        this.propertyService.getProperty(this.propertyId).subscribe({
          next: (property: Property) => {
            console.log(property)
            this.populateForm(property);
          },
          error: (error) => {
            console.error('Error fetching property data', error);
          }
        });
      }
    });
  }

  populateForm(property: Property): void {
    this.addAdvertisementForm.patchValue({
      type: property.type,
      status: property.status,
      title: property.title,
      description: property.description,
      price: property.price,
      location: property.location,
      cif: property.cif // Ensure this matches the form control name
    });

    // Set image URLs for preview
    this.mainImageUrl = property.imageUrl || null;
    this.image1Url = property.images[0]?.url || null;
    this.image2Url = property.images[1]?.url || null;
    this.image3Url = property.images[2]?.url || null;
  }

  onFileChange(event: Event, imageType: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        switch (imageType) {
          case 'mainImage':
            this.mainImageUrl = e.target.result;
            break;
          case 'image1':
            this.image1Url = e.target.result;
            break;
          case 'image2':
            this.image2Url = e.target.result;
            break;
          case 'image3':
            this.image3Url = e.target.result;
            break;
        }
      };
      reader.readAsDataURL(input.files[0]);
    }
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
      formData.append('cif', formValues.cif);

      const mainImage = (document.getElementById('imageUrl') as HTMLInputElement)?.files![0];
      const image1 = (document.getElementById('image1') as HTMLInputElement)?.files![0];
      const image2 = (document.getElementById('image2') as HTMLInputElement)?.files![0];
      const image3 = (document.getElementById('image3') as HTMLInputElement)?.files![0];

      if (mainImage) {
        formData.append('images', mainImage);
      }
      if (image1) {
        formData.append('images', image1);
      }
      if (image2) {
        formData.append('images', image2);
      }
      if (image3) {
        formData.append('images', image3);
      }

      if (this.propertyId) {
        this.propertyService.updateProperty(this.propertyId, formData).subscribe({
          next: (response) => {
            console.log('Property updated successfully', response);
            this.router.navigate(['/details', this.propertyId]);
          },
          error: (error) => {
            console.error('Error updating property', error);
          }
        });
      } else {
        this.propertyService.addProperty(formData).subscribe({
          next: (response) => {
            console.log('Property added successfully', response);
          },
          error: (error) => {
            console.error('Error adding property', error);
          }
        });
      }
    }
  }
}
