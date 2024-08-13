import { Component, Input } from '@angular/core';
import { ReservationResponse } from '../../models/reservation-response';
import { ReservationStatus } from '../../models/reservation-status';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent {

  @Input() propertyId!: number;
  loading = false;
  errorMessage: string | null = null;

  reservations: ReservationResponse[] = [];
  checkinDate?: string = '2024-08-01';
  checkoutDate?: string = '2024-08-15';
  status?: ReservationStatus = ReservationStatus.CONFIRME;
  
  public ReservationStatusEnum = ReservationStatus;

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations(): void {
    this.loading = true;
    this.errorMessage = null;
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

  filterReservations(propertyId: number, checkinDate?: string, checkoutDate?: string, status?: ReservationStatus): void {
    this.propertyId = propertyId;
    this.checkinDate = checkinDate;
    this.checkoutDate = checkoutDate;
    this.status = status;
    this.getReservations();
  }
}