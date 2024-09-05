import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyResponse } from 'src/app/modules/properties/models/property-response';
import { PropertyType } from 'src/app/modules/properties/models/property-type';
import { PropertyService } from 'src/app/modules/properties/services/property.service';
import { CustomSnackBarService } from 'src/app/shared/custom-snack-bar/custom-snack-bar.service';

@Component({
  selector: 'app-properties-listing',
  templateUrl: './properties-listing.component.html',
  styleUrls: ['./properties-listing.component.scss']
})
export class PropertiesListingComponent implements OnInit {
  description?: string;
  country?: string;
  city?: string;
  propertyType?: PropertyType.Appartement;
  checkin?: string;
  checkout?: string;
  dateError: boolean = false;

  minNumberOfRooms?: number;
  maxNumberOfRooms?: number;

  minNumberOfPersons?: number;
  maxNumberOfPersons?: number;

  minSurface?: number;
  maxSurface?: number;

  minPricePerNight?: number;
  maxPricePerNight?: number;

  properties?: PropertyResponse[];
  propertiesFetched: boolean = false;
  loading = false;
  error = false;
  errorMessage: string | null = null;

  constructor(
    private propertyService: PropertyService,
    private route: ActivatedRoute,
    private customSnackBar: CustomSnackBarService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.description = params['description'] || this.description;
      this.country = params['country'] || this.country;
      this.city = params['city'] || this.city;
      this.propertyType = params['propertyType'] || this.propertyType;
      this.checkin = params['checkin'] || this.checkin;
      this.checkout = params['checkout'] || this.checkout;

      this.filterProperties();
    });
  }

  filterProperties() {
    if (this.checkin && this.checkout) {
      const checkinDate = new Date(this.checkin);
      const checkoutDate = new Date(this.checkout);
  
      if (checkoutDate <= checkinDate) {
        this.properties = [];
        return;
      }
    }

    this.loading = true;
    this.propertiesFetched = false;
  
    this.propertyService.getAllProperties(
      this.description,
      this.country,
      this.city,
      this.propertyType,
      this.checkin,
      this.checkout,
      this.minNumberOfRooms,
      this.maxNumberOfRooms,
      this.minNumberOfPersons,
      this.maxNumberOfPersons,
      this.minSurface,
      this.maxSurface,
      this.minPricePerNight,
      this.maxPricePerNight
    ).subscribe(response => {
      this.properties = response;
      this.propertiesFetched = true;
      this.loading = false;
    }, error => {
      console.error('Error getting properties:', error);
      this.propertiesFetched = true;
      this.loading = false;
      this.error = true;
      this.errorMessage = "Erreur lors de la récupération des propriétés. Veuillez réessayer plus tard.";
    });
  }

  clearFilters(): void {

    this.minNumberOfRooms = undefined;
    this.maxNumberOfRooms = undefined;
    
    this.minNumberOfPersons = undefined;
    this.maxNumberOfPersons = undefined;
    
    this.minSurface = undefined;
    this.maxSurface = undefined;
    
    this.minPricePerNight = undefined;
    this.maxPricePerNight = undefined;
  
    this.filterProperties();
  }
}
