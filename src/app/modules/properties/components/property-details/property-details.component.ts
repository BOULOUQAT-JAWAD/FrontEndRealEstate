import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { PropertyResponse } from '../../models/property-response';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { CustomSnackBarService } from 'src/app/shared/custom-snack-bar/custom-snack-bar.service';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit {

  private propertyId: number | null;
  propertyData!: PropertyResponse;
  propertyFetched!: boolean;
  currentIndex = 0;

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.propertyData.propertyImages.length;
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.propertyData.propertyImages.length) % this.propertyData.propertyImages.length;
  }
  
  constructor(private activeRoute: ActivatedRoute, private propertyService: PropertyService, private customSnackBar: CustomSnackBarService,

    private location: Location,
  ) {
    this.propertyId = parseInt(activeRoute.snapshot.paramMap.get("id") || '');
    console.log(this.propertyId)
  }

  ngOnInit(): void {
    this.propertyFetched = false;
    if (this.propertyService.property == null) {
      this.fetchProperty()
    }
    else {
      this.propertyData = this.propertyService.property;
      this.propertyFetched = true;
    }
  }

  fetchProperty() {
    this.propertyService.getProperty(this.propertyId!).subscribe(
      (response) => {
        this.propertyData = response;
        this.propertyFetched = true;
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.propertyFetched = true;
        this.customSnackBar.show('Erreur lors de la récupération de cette propriété, veuillez réessayer plus tard', 'error', 'red');
      }
    )
  }
}
