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

  private propertyId: string | null;
  property!: PropertyResponse;
  propertyFetched!: boolean;

  constructor(private activeRoute: ActivatedRoute, private propertyService: PropertyService, private customSnackBar: CustomSnackBarService,

    private location: Location,
  ) {
    this.propertyId = activeRoute.snapshot.paramMap.get("id");
    console.log(this.propertyId)
  }

  ngOnInit(): void {
    this.propertyFetched = false;
    if (this.propertyService.property == null) {
      this.fetchProperty()
    }
    else {
      this.property = this.propertyService.property;
      this.propertyFetched = true;
    }
  }

  fetchProperty() {
    this.propertyService.getProperty(this.propertyId!).subscribe(
      (response) => {
        this.property = response;
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
