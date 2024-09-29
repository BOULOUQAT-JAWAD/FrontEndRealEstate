import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyResponse } from 'src/app/modules/properties/models/property-response';
import { PropertyType } from 'src/app/modules/properties/models/property-type';
import { PropertyService } from 'src/app/modules/properties/services/property.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  description?: string;
  country?: string;
  city?: string;
  propertyType?: PropertyType.Appartement;
  checkin?: string;
  checkout?: string;
  today: string;

  properties?: PropertyResponse[];
  propertiesFetched: boolean = false;

  constructor(
    private propertyService: PropertyService,
    private router: Router,
    private activeRoute:ActivatedRoute,private toast:ToastrService
  ) {
    const currentDate = new Date();
    this.today = currentDate.toISOString().split('T')[0];
   }

  ngOnInit(): void {
    this.filterProperties();
    this.activeRoute.queryParamMap.subscribe(
      (params)=>{
        if (params.get("reservation") == 'done'){
          this.toast.success("Votre reservation est faite avec succee! Merci de verifier votre boite email.")
        }
        if (params.get("userSubscribed") == 'true'){
          this.toast.success("Your subscription is updated successfully")
        }
        
      }
    );

  }

  filterProperties() {
    this.propertiesFetched = false;
    this.propertyService.getAllProperties(this.description, this.country, this.city, this.propertyType, this.checkin, this.checkout).subscribe(response => {
      this.properties = response.slice(0, 6);
      this.propertiesFetched = true;
    }, error => {
      console.error('Error getting properties:', error);
      this.propertiesFetched = true;
    });
  }

  navigateToPropertiesListing() {
    this.router.navigate(['/properties'], {
      queryParams: {
        description: this.description,
        country: this.country,
        city: this.city,
        propertyType: this.propertyType,
        checkin: this.checkin,
        checkout: this.checkout
      }
    });
  }
}