import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PropertyResponse } from '../../models/property-response';
import { PropertyService } from '../../services/property.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomSnackBarService } from 'src/app/shared/custom-snack-bar/custom-snack-bar.service';

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.scss']
})
export class PropertiesListComponent implements OnInit, OnChanges  {
  
  propertyFetched!: boolean;
  properties: PropertyResponse[] = [];
  loading = false;
  error = false;

  constructor(private propertyService: PropertyService, private customSnackBar: CustomSnackBarService) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges")
  }
  
  ngOnInit(): void {
    this.propertyFetched=false;
    if (this.propertyService.properties.length == 0){
      this.fetchAllProperties()
    }
    else {
      this.properties = this.propertyService.properties;
      this.propertyFetched=true;
    }
  }

  fetchAllProperties(){
    this.loading = true;
    this.error = false;
    this.propertyService.getAllProperties().subscribe(
      (response) => {
        this.properties = response;
        this.propertyFetched = true;
        this.loading = false;
        if (this.properties.length === 0) {
          this.customSnackBar.show('Aucune propriété trouvée.', 'info', 'blue');
        }
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.loading = false;
        this.error = true;
        this.customSnackBar.show('Erreur lors de la récupération des propriétés. Veuillez réessayer plus tard.', 'error', 'red');
      }
    )
  }

  retryFetchingProperties() {
    this.fetchAllProperties();
  }
  
}

