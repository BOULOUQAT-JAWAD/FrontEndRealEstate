import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyResponse } from 'src/app/modules/properties/models/property-response';
import { PropertyService } from 'src/app/modules/properties/services/property.service';
import { ReservationRequest } from 'src/app/modules/reservation/models/reservation-request';
import { ReservationService } from 'src/app/modules/reservation/services/reservation.service';
import { CustomSnackBarService } from 'src/app/shared/custom-snack-bar/custom-snack-bar.service';
import { PjServicesComponent } from '../pj-services/pj-services.component';

@Component({
  selector: 'app-one-property',
  templateUrl: './one-property.component.html',
  styleUrls: ['./one-property.component.scss']
})
export class OnePropertyComponent implements OnInit {

  private propertyId: number;
  reservationId?: number;
  propertyData!: PropertyResponse;
  propertyFetched!: boolean;
  currentIndex = 0;
  checkin?: string;
  checkout?: string;
  today: string;

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.propertyData.propertyImages.length;
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.propertyData.propertyImages.length) % this.propertyData.propertyImages.length;
  }

  constructor(private router: Router, private activeRoute: ActivatedRoute, private propertyService: PropertyService, private customSnackBar: CustomSnackBarService, private reservationService: ReservationService, public dialog: MatDialog) {
    this.propertyId = parseInt(activeRoute.snapshot.paramMap.get("id") || '');
    const currentDate = new Date();
    this.today = currentDate.toISOString().split('T')[0];
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
    this.propertyService.getOneProperty(this.propertyId!).subscribe(
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

  isPropertyAvailable() {
    if (!this.checkin || !this.checkout) {
      this.customSnackBar.show('Veuillez sélectionner les dates de checkin et checkout.', 'warning', 'yellow');
      return;
    }

    const checkinDate = new Date(this.checkin);
    const checkoutDate = new Date(this.checkout);

    if (checkoutDate <= checkinDate) {
      this.customSnackBar.show('La date de checkout doit être supérieure à la date de checkin.', 'warning', 'yellow');
      return;
    }

    // If the dates are valid, call the service to check property availability
    this.propertyService.isPropertyAvailable(this.propertyId!, this.checkin, this.checkout).subscribe(
      (response) => {
        if (response == true) {
          console.log("available");
          const reservationRequest: ReservationRequest = {
            propertyId: this.propertyId!,
            checkinDate: this.checkin!,
            checkoutDate: this.checkout!,
          };

          this.reservationService.saveOrUpdateReservation(reservationRequest).subscribe(
            (response) => {
              // this.customSnackBar.show('Votre réservation a été effectuée avec succès.', 'success', 'green');
              this.reservationId = response.reservationId
              console.log("reservationId : "+this.reservationId)
              this.openServiceDialog();
            },
            (error: HttpErrorResponse) => {
              console.log(error.message)
              console.log(error.status)
              if (error.status === 403) {
                this.customSnackBar.show('Merci de vous authentifier en tant que voyageur', 'error', 'red');
                this.router.navigate(["/signup"])
              } else {
                this.customSnackBar.show('Erreur lors de la sauvegarde de la réservation. Veuillez réessayer.', 'error', 'red');
              }
            }
          );
        } else {
          this.customSnackBar.show('La propriété n\'est pas disponible aux dates sélectionnées. Veuillez choisir d\'autres dates.', 'error', 'red');
        }
      },
      (error: HttpErrorResponse) => {
        this.customSnackBar.show(error.message, 'warning', 'yellow');
      }
    );
  }

  openServiceDialog(): void {
    const dialogRef = this.dialog.open(PjServicesComponent, {
      width: '600px',
    });
  
    dialogRef.afterClosed().subscribe((selectedServiceIds: number[] = []) => {
      const requestPayload = {
        reservationId: this.reservationId,
        pjServiceIds: selectedServiceIds
      };
  
      console.log('Reservation and Selected Services:', requestPayload);
    });
  }
}
