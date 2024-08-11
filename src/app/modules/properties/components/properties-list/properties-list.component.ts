import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PropertyResponse } from '../../models/property-response';
import { PropertyService } from '../../services/property.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.scss']
})
export class PropertiesListComponent implements OnInit, OnChanges  {
  
  propertyFetched!: boolean;
  properties: PropertyResponse[] = [];

  constructor(private propertyService: PropertyService) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges")
  }
  
  ngOnInit(): void {
    this.propertyFetched=false;
    if (this.propertyService.properties.length == 0){
      this.fetchAllProduct()
    }
    else {
      this.properties = this.propertyService.properties;
      this.propertyFetched=true;
    }
  }

  fetchAllProduct(){
    this.propertyService.getAllProperties().subscribe(
      (response)=>{
        this.properties=response;
        this.propertyFetched=true;
      },
      (error: HttpErrorResponse) =>{
        console.error(error);
      }
    )
  }
  
}

