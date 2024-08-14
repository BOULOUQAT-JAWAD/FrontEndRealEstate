import { Component, Input, OnInit } from '@angular/core';
import { ReservationResponse } from '../../models/reservation-response';
import { ReservationStatus } from '../../models/reservation-status';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent implements OnInit {

  @Input() propertyId!: number;
  loading = false;
  errorMessage: string | null = null;

  reservations: ReservationResponse[] = [];
  checkinDate?: string;
  checkoutDate?: string;
  status?: ReservationStatus = ReservationStatus.CONFIRME;
  
  public ReservationStatusEnum = ReservationStatus;

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    const today = new Date();
    this.checkinDate = today.toISOString().split('T')[0];
    this.getReservations();
  }

  getReservations(): void {
    this.loading = true;
    this.errorMessage = null;

    if (this.checkoutDate && this.checkinDate && this.checkoutDate < this.checkinDate) {
      this.errorMessage = "La date de départ ne peut pas être antérieure à la date d'arrivée.";
      this.loading = false;
      return;
    }

    this.reservationService.getAllReservations(this.propertyId, this.checkinDate, this.checkoutDate, this.status)
      .subscribe({
        next: (data: ReservationResponse[]) => {
          this.reservations = data;
        },
        error: (err) => {
          console.error('Error fetching reservations', err);
          this.errorMessage = 'Erreur lors de la récupération des réservations. Veuillez réessayer plus tard.';
        },
        complete: () => {
          this.loading = false;
        }
      });
  }

  filterReservations(): void {
    this.getReservations();
  }

  clearFilter(): void {
    this.checkinDate = undefined;
    this.checkoutDate = undefined;
    this.status = undefined;
  }
}