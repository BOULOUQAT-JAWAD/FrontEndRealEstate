import { Component, OnInit } from '@angular/core';
import { PropertyType } from 'src/app/modules/properties/models/property-type';
import { PropertyService } from 'src/app/modules/properties/services/property.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  description?:string;
  country?:string;
  city?:string;
  propertyType?:PropertyType.Appartement;
  checkin?: string;
  checkout?: string;

  propertyTypes = Object.values(PropertyType);

  constructor(
    private propertyService: PropertyService,
  ) { }

  ngOnInit(): void {
    console.log("ngOnInit")
    this.filterProperties();
  }

  filterProperties() {
    this.propertyService.getAllProperties(this.description, this.country, this.city, this.propertyType, this.checkin,this.checkout).subscribe(response => {
      console.log('properties :', response);
    }, error => {
      console.error('Error getting properties:', error);
    });
  }
}