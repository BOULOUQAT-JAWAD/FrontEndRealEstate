import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PjService } from 'src/app/modules/pj-services/models/pj-service';
import { PjServicesService } from 'src/app/modules/pj-services/services/pj-services.service';
import { CustomSnackBarService } from 'src/app/shared/custom-snack-bar/custom-snack-bar.service';

@Component({
  selector: 'app-pj-services',
  templateUrl: './pj-services.component.html',
  styleUrls: ['./pj-services.component.scss']
})
export class PjServicesComponent implements OnInit {

  servicesList: PjService[] = [];
  selectedServiceIds: number[] = [];

  constructor(private customSnackBar: CustomSnackBarService, private pjServiceService: PjServicesService,
    public dialogRef: MatDialogRef<PjServicesComponent>) { }

  ngOnInit(): void {
    this.fetchPjServices();
  }

  fetchPjServices(): void {
    this.pjServiceService.getPjServicesForVoyageur().subscribe({
      next: (services: PjService[]) => {
        this.servicesList = services;
      },
      error: (err) => {
        console.error('Error fetching services', err);
        this.customSnackBar.show('Échec du chargement des services. Veuillez réessayer plus tard.', 'error', 'red');
      }
    });
  }

  toggleServiceSelection(serviceId: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedServiceIds.push(serviceId);
    } else {
      this.selectedServiceIds = this.selectedServiceIds.filter(id => id !== serviceId);
    }
  }

  saveSelectedServices(): void {
    this.dialogRef.close(this.selectedServiceIds);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}