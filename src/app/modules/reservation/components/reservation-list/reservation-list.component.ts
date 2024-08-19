import { Component, Input, OnInit } from '@angular/core';
import { ReservationResponse } from '../../models/reservation-response';
import { ReservationStatus } from '../../models/reservation-status';
import { ReservationService } from '../../services/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent implements OnInit {

  @Input() propertyId: number | undefined;
  loading = false;
  isDashBoardRoute = false;
  errorMessage: string | null = null;

  reservations: ReservationResponse[] = [];
  checkinDate?: string;
  checkoutDate?: string;
  status?: ReservationStatus = ReservationStatus.CONFIRME;
  
  public ReservationStatusEnum = ReservationStatus;

  constructor(private reservationService: ReservationService, private router: Router, private route: ActivatedRoute) { }

  checkIfIncomeRoute(): void {
    const url = this.router.url;
    this.isDashBoardRoute = url.includes('/client/dashboard');
    console.log("isDashBoardRoute : "+this.isDashBoardRoute);
  }

  ngOnInit(): void {
    this.checkIfIncomeRoute();
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

    if(this.isDashBoardRoute == false){
      this.reservationService.getPropertyReservations(this.propertyId!, this.checkinDate, this.checkoutDate, this.status)
        .subscribe({
          next: (data: ReservationResponse[]) => {
            this.reservations = data;
          },
          error: (err) => {
            console.error('Error fetching reservations', err);
            this.errorMessage = 'Erreur lors de la récupération des réservations. Veuillez réessayer plus tard.';
          },
        });
        this.loading = false;
    }
    else{
      this.reservationService.getClientReservationsDateRange(this.checkinDate, this.checkoutDate, this.status)
        .subscribe({
          next: (data: ReservationResponse[]) => {
            this.reservations = data;
          },
          error: (err) => {
            console.error('Error fetching reservations', err);
            this.errorMessage = 'Erreur lors de la récupération des réservations. Veuillez réessayer plus tard.';
          },
        });
        this.loading = false;
    }
  }

  getTotalIncome(): number {
    return this.reservations.reduce((total, reservation) => total + reservation.price, 0);
  }

  filterReservations(): void {
    this.getReservations();
  }

  clearFilter(): void {
    this.checkinDate = undefined;
    this.checkoutDate = undefined;
    if(this.isDashBoardRoute == false){
      this.status = undefined;
    }
  }
}