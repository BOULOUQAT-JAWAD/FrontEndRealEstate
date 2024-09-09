import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { PropertyRequest } from '../../models/property-request';
import { PropertyType } from '../../models/property-type';
import { PropertyStatus } from '../../models/property-status';
import { PropertyResponse } from '../../models/property-response';
import { ImageService } from 'src/app/core/services/image.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html'
})
export class PropertyFormComponent implements OnInit {

  propertyForm!: FormGroup;
  propertyId?: number;
  selectedFiles: File[] = [];  
  propertyImages: string[] = [];
  // selectedPjServices: PjService[] = [];

  propertyTypes = Object.values(PropertyType);
  propertyStatuses = Object.values(PropertyStatus);

  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService,
    private route: ActivatedRoute,
    private router: Router,
    private imageService: ImageService,
    public dialog: MatDialog   
    // private pjServicesService: PjServicesService,
  ) { }

  // onFileChange(event: any): void {
  //   if (event.target.files) {
  //     this.selectedFiles = Array.from(event.target.files);
  //   }
  // }

  // onServiceChange(event: any, service: PjService): void {
  //   let selectedServices:number[] = this.propertyForm.value.pjServices || [];
  
  //   if (event.target.checked) {
  //     if (!selectedServices.some(s  => s === service.pjServiceId)) {
  //       selectedServices.push(service.pjServiceId);
  //       console.log('Service added:', { pjServiceId: service.pjServiceId });
  //     }
  //   } else {
  //     selectedServices = selectedServices.filter(s => s !== service.pjServiceId);
  //     console.log('Service removed:', service.pjServiceId);
  //   }
  
  //   this.propertyForm.patchValue({
  //     pjServices: selectedServices
  //   });
  
  //   console.log('After change:', this.propertyForm.value.pjServices);
  // }

  ngOnInit(): void {
    this.initializeForm();
    this.checkEditMode();
  }

  checkEditMode(): void {
    const currentRoute = this.route.snapshot.routeConfig?.path;
    console.log('currentRoute : ' + currentRoute);

    // Fetch available services
    // this.pjServicesService.getPjServicesForClient().subscribe((services: PjService[]) => {
    //   this.selectedPjServices = services;
    // });

    if (currentRoute === 'property/edit/:id') {
      const idParam = this.route.snapshot.paramMap.get('id');
      if (idParam) {
        const id = Number(idParam);
        if (!isNaN(id)) {
          this.propertyId = id;
          this.loadProperty(id);
        } else {
          console.error('Invalid ID:', idParam);
        }
      }
    }
  }

  initializeForm(): void {
    this.propertyForm = this.fb.group({
      propertyId: [null],
      title: ['', Validators.required], // Added title field
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
      publish: [false],
      propertyImages: []
      // pjServices: [[]], 
    });
  }

  loadProperty(id: number): void {
    this.propertyService.getProperty(id).subscribe((property: PropertyResponse) => {
      this.propertyForm.patchValue({
        propertyId: property.propertyId,
        description: property.description,
        title: property.title, // Added title field
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
        publish: property.publish,
        propertyImages: property.propertyImages,
        // pjServices : property.pjServices.map(service => service.pjServiceId) 
      });

      // Store the images in a local variable for further use if needed
      this.propertyImages = property.propertyImages || [];
    });
  }

  onFileChange(event: any): void {
    if (event.target.files) {
      this.selectedFiles = Array.from(event.target.files);
      this.uploadImages();
    }
  }

  uploadImages(): void {
    if (this.selectedFiles.length === 0) {
      return;
    }

    const formData = new FormData();
    this.selectedFiles.forEach((file) => {
      formData.append('images', file, file.name);
    });

    this.imageService.uploadImages(formData).subscribe((urls: string[]) => {
      this.propertyImages.push(...urls);
      this.propertyForm.patchValue({ propertyImages: this.propertyImages });
    });
  }

  onDeleteImage(index: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmation de suppression',
        message: 'Êtes-vous sûr de vouloir supprimer cette image ?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.removeImage(index);
      }
    });
  }
  
  removeImage(index: number): void {
    this.propertyImages.splice(index, 1);
    this.propertyForm.patchValue({ propertyImages: this.propertyImages });
  }

  onSubmit(): void {
    if (this.propertyForm.valid) {

      // const selectedServiceIds: number[] = this.propertyForm.value.pjServices || [];
      // const selectedServices: { pjServiceId: number }[] = selectedServiceIds.map(id => ({ pjServiceId: id }));

      // this.propertyForm.patchValue({
      //   pjServices: selectedServices
      // });
  
      const property: PropertyRequest = this.propertyForm.value;

      // const formData: FormData = new FormData();
      // formData.append('property', new Blob([JSON.stringify(property)], {
      //   type: 'application/json'
      // }));

      // console.log("property  :  "+JSON.stringify(property));
      
      // this.selectedFiles.forEach((file, index) => {
      //   formData.append('images', file, file.name);
      // });
  
      if (this.propertyId) {
        property.propertyId = this.propertyId;
        this.propertyService.saveOrUpdateProperty(property).subscribe(response => {
          console.log('Property updated:', response);
          this.router.navigate(['/client/properties']);
        }, error => {
          console.error('Error updating property:', error);
        });
      } else {
        this.propertyService.saveOrUpdateProperty(property).subscribe(response => {
          console.log('Property created:', response);
          this.router.navigate(['/client/properties']);
        }, error => {
          console.error('Error creating property:', error);
        });
      }
    } else {
      this.propertyForm.markAllAsTouched();
    }
  }
}