import { Injectable } from '@angular/core';
import { ReservationResponse } from '../models/reservation-response';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/app/environment/environment';
import { Observable } from 'rxjs';
import { ReservationRequest } from '../models/reservation-request';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {


  public reservations: ReservationResponse[] = []
  public reservation?: ReservationResponse;

  constructor(
    private httpClient: HttpClient
  ) { }

  checkoutReservation(requestPayload: { reservationId: number | undefined; pjServiceIds: number[]; }) {
    return this.httpClient.post(`${environment.baseUrl}payment/checkout/reservation`,requestPayload);
  }


  public getPropertyReservations(propertyId: number, checkinDate?: string, checkoutDate?: string, status?: string): Observable<ReservationResponse[]> {
    // const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
     

    let params = new HttpParams()
      .set('propertyId', propertyId.toString());

    if (checkinDate != null) {
      params = params
        .set('checkinDate', checkinDate);
    }
    if (checkoutDate != null) {
      params = params
        .set('checkoutDate', checkoutDate);
    }
    if (status != null) {
      params = params
        .set('status', status);
    }

    return this.httpClient.get<ReservationResponse[]>(`${environment.baseUrl}reservations/property`, {   params });
  }


  public getClientReservations(checkinDate?: string, checkoutDate?: string, status?: string): Observable<ReservationResponse[]> {
    // const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
     

    let params = new HttpParams();

    if (checkinDate != null) {
      params = params
        .set('checkinDate', checkinDate);
    }
    if (checkoutDate != null) {
      params = params
        .set('checkoutDate', checkoutDate);
    }
    if (status != null) {
      params = params
        .set('status', status);
    }

    return this.httpClient.get<ReservationResponse[]>(`${environment.baseUrl}reservations/client`, {   params });
  }

  public getClientReservationsDateRange(checkinDate?: string, checkoutDate?: string, status?: string): Observable<ReservationResponse[]> {
    // const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
     

    let params = new HttpParams();

    if (checkinDate != null) {
      params = params
        .set('checkinDate', checkinDate);
    }
    if (checkoutDate != null) {
      params = params
        .set('checkoutDate', checkoutDate);
    }
    if (status != null) {
      params = params
        .set('status', status);
    }

    return this.httpClient.get<ReservationResponse[]>(`${environment.baseUrl}reservations/client/income`, {   params });
  }

  public saveOrUpdateReservation(request: ReservationRequest): Observable<ReservationResponse> {

    return this.httpClient.post<ReservationResponse>(`${environment.baseUrl}reservations`, request);

  }
}
