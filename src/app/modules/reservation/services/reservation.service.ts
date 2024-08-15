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

  token: String = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huLmRvZTNAZXhhbXBsZS5jb20iLCJyb2xlcyI6IltDTElFTlRdIiwiZXhwIjoxNzIzNzMwMzg0fQ.Lrt3pPp2LaY_xbiTWA2HtTpyCQyl-chu-zrF3Ez2S6w";

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllReservations(propertyId: number, checkinDate?: string, checkoutDate?: string, status?: string): Observable<ReservationResponse[]> {
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

    return this.httpClient.get<ReservationResponse[]>(`${environment.baseUrl}reservations`, { headers, params });
  }

}
