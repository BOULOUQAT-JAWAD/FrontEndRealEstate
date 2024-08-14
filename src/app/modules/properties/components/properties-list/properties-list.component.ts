import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PropertyResponse } from '../../models/property-response';
import { PropertyService } from '../../services/property.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomSnackBarService } from 'src/app/shared/custom-snack-bar/custom-snack-bar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.scss']
})
export class PropertiesListComponent implements OnInit, OnChanges {
  
  properties: PropertyResponse[] = [];
  loading = false;
  error = false;
  startDate?: string;
  endDate?: string;

  constructor(private router: Router, private propertyService: PropertyService, private customSnackBar: CustomSnackBarService) {}

  goToAddPropertyForm() {
    this.router.navigate(['property/add']);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges");
  }
  
  ngOnInit(): void {
      const today = new Date();
      this.startDate = today.toISOString().split('T')[0];
    if (this.propertyService.properties.length === 0) {
      this.fetchAllProperties();
    } else {
      this.properties = this.propertyService.properties;
    }
  }

  fetchAllProperties() {
    this.loading = true;
    this.error = false;
    this.propertyService.getAllProperties().subscribe(
      (response) => {
        this.properties = response;
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
    );
  }

  fetchOccupiedProperties() {
    if (!this.startDate || !this.endDate) {
      this.customSnackBar.show('Veuillez sélectionner une période valide.', 'info', 'blue');
      return;
    }
    this.loading = true;
    this.error = false;
    this.propertyService.getClientOccupiedProperties(this.startDate, this.endDate).subscribe(
      (response) => {
        this.properties = response;
        this.loading = false;
        if (this.properties.length === 0) {
          this.customSnackBar.show('Aucune propriété occupée trouvée.', 'info', 'blue');
        }
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.loading = false;
        this.error = true;
        this.customSnackBar.show('Erreur lors de la récupération des propriétés occupées.', 'error', 'red');
      }
    );
  }

  fetchAvailableProperties() {
    if (!this.startDate || !this.endDate) {
      this.customSnackBar.show('Veuillez sélectionner une période valide.', 'info', 'blue');
      return;
    }
    this.loading = true;
    this.error = false;
    this.propertyService.getClientAvailableProperties(this.startDate, this.endDate).subscribe(
      (response) => {
        this.properties = response;
        this.loading = false;
        if (this.properties.length === 0) {
          this.customSnackBar.show('Aucune propriété disponible trouvée.', 'info', 'blue');
        }
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.loading = false;
        this.error = true;
        this.customSnackBar.show('Erreur lors de la récupération des propriétés disponibles.', 'error', 'red');
      }
    );
  }

  retryFetchingProperties() {
    this.fetchAllProperties();
  }
}