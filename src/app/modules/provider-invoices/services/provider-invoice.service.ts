import { Injectable } from '@angular/core';
import { ProviderInvoice } from '../models/provider-invoice';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProviderInvoiceService {

  public clientReservationsServices: ProviderInvoice[] = [];
  public clientReservationsService?:ProviderInvoice;
  
  public clientPropertiessServices: ProviderInvoice[] = [];
  public clientPropertiessService?:ProviderInvoice;
  
  constructor(
    private httpClient: HttpClient
  ) { }

  public getClientReservationsServices(): Observable<ProviderInvoice[]> {
    // const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${environment.token}`);

    return this.httpClient.get<ProviderInvoice[]>(`${environment.baseUrl}provideInvoices/reservations/client`, { headers });
  }

  public getClientPropertiesServices(): Observable<ProviderInvoice[]> {
    // const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${environment.token}`);

    return this.httpClient.get<ProviderInvoice[]>(`${environment.baseUrl}provideInvoices/properties/client`, { headers });
  }
}
