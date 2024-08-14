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

  token: String = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huLmRvZTNAZXhhbXBsZS5jb20iLCJyb2xlcyI6IltDTElFTlRdIiwiZXhwIjoxNzIzNjM1NjgxfQ.AM1wsAyqxRnYsDV6f3sDqlrMWvjm8zblD1ogw8G23xA";

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllReservations(propertyId: number, checkinDate?: string, checkoutDate?: string, status?: string): Observable<ReservationResponse[]> {
    // const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

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

    return this.httpClient.get<ReservationResponse[]>(`${environment.baseUrl}reservations`, { headers, params });
  }

}
