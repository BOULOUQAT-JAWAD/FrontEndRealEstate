import { Injectable } from '@angular/core';
import { ReservationResponse } from '../models/reservation-response';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/app/environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {


  public reservations: ReservationResponse[] = []
  public reservation?: ReservationResponse;

  constructor(
    private httpClient: HttpClient
  ) { }

  public getPropertyReservations(propertyId: number, checkinDate?: string, checkoutDate?: string, status?: string): Observable<ReservationResponse[]> {
    // const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${environment.token}`);

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

    return this.httpClient.get<ReservationResponse[]>(`${environment.baseUrl}reservations/property`, { headers, params });
  }


  public getClientReservations(checkinDate?: string, checkoutDate?: string, status?: string): Observable<ReservationResponse[]> {
    // const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${environment.token}`);

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

    return this.httpClient.get<ReservationResponse[]>(`${environment.baseUrl}reservations/client`, { headers, params });
  }

  public getClientReservationsDateRange(checkinDate?: string, checkoutDate?: string, status?: string): Observable<ReservationResponse[]> {
    // const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${environment.token}`);

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

    return this.httpClient.get<ReservationResponse[]>(`${environment.baseUrl}reservations/client/income`, { headers, params });
  }
}
