import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { PropertyRequest } from '../../models/property-request';
import { PropertyType } from '../../models/property-type';
import { PropertyStatus } from '../../models/property-status';
import { PropertyResponse } from '../../models/property-response';


@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html'
})
export class PropertyFormComponent implements OnInit {

  propertyForm!: FormGroup;
  propertyId?: number;

  propertyTypes = Object.values(PropertyType);
  propertyStatuses = Object.values(PropertyStatus);

  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Initialize the form
    this.initializeForm();

    // Identify which route is active: add or edit
    const currentRoute = this.route.snapshot.routeConfig?.path;
    console.log('currentRoute : ' + currentRoute);

    if (currentRoute === 'property/edit/:id') {
      const idParam = this.route.snapshot.paramMap.get('id');
      if (idParam) {
        const id = Number(idParam);
        if (!isNaN(id)) {
          this.propertyId = id;
          this.loadProperty(id); // Load the property data for editing
        } else {
          console.error('Invalid ID:', idParam);
        }
      }
    } else if (currentRoute === 'property/add') {
      // This is the add route
      console.log('Adding a new property');
      // No need to fetch any property data, as this is a new property
    }
  }

  initializeForm(): void {
    this.propertyForm = this.fb.group({
      propertyId: [null],
      description: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      propertyType: [PropertyType.Appartement, Validators.required],
      propertyStatus: [PropertyStatus.Propre, Validators.required],
      numberOfRooms: [0, [Validators.required, Validators.min(1)]],
      numberOfPersons: [0, [Validators.required, Validators.min(1)]],
      surface: [0, [Validators.required, Validators.min(1)]],
      occupiedFrom: [null],
      occupiedTo: [null],
      pricePerNight: [0, [Validators.required, Validators.min(0)]],
      publish: [false, Validators.required],
    });
  }

  loadProperty(id: number): void {
    this.propertyService.getProperty(id).subscribe((property: PropertyResponse) => {
      this.propertyForm.patchValue({
        propertyId: property.propertyId,
        description: property.description,
        country: property.country,
        city: property.city,
        propertyType: property.propertyType,
        propertyStatus: property.propertyStatus,
        numberOfRooms: property.numberOfRooms,
        numberOfPersons: property.numberOfPersons,
        surface: property.surface,
        occupiedFrom: property.occupiedFrom,
        occupiedTo: property.occupiedTo,
        pricePerNight: property.pricePerNight,
        publish: property.publish
      });

      // // If there are images, populate the form array
      // const propertyImagesControl = this.propertyForm.get('propertyImages');
      // if (propertyImagesControl && property.propertyImages) {
      //   property.propertyImages.forEach(image => {
      //     propertyImagesControl.push(this.fb.group({
      //       propertyImagesId: image.propertyImagesId,
      //       image: image.image
      //     }));
      //   });
      // }
    });
  }

  onSubmit(): void {
    if (this.propertyForm.valid) {
      const property: PropertyRequest = this.propertyForm.value;
  
      const formData: FormData = new FormData();
      formData.append('property', new Blob([JSON.stringify(property)], {
        type: 'application/json'
      }));
  
      if (this.propertyId) {
        property.propertyId = this.propertyId;
        this.propertyService.saveOrUpdateProperty(formData).subscribe(response => {
          console.log('Property updated:', response);
          this.router.navigate(['/properties']);
        }, error => {
          console.error('Error updating property:', error);
        });
      } else {
        this.propertyService.saveOrUpdateProperty(formData).subscribe(response => {
          console.log('Property created:', response);
          this.router.navigate(['/properties']);
        }, error => {
          console.error('Error creating property:', error);
        });
      }
    } else {
      this.propertyForm.markAllAsTouched();
    }
  }
}