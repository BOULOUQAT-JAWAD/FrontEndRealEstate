import { Injectable } from '@angular/core';
import { ProviderInvoice, ProviderInvoiceStatus } from '../models/provider-invoice';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProviderInvoiceService {

  public clientReservationsServices: ProviderInvoice[] = [];
  public clientReservationsService?: ProviderInvoice;

  public clientPropertiessServices: ProviderInvoice[] = [];
  public clientPropertiessService?: ProviderInvoice;

  constructor(
    private httpClient: HttpClient
  ) { }

  public getClientReservationsServices(startDate: string | undefined, endDate: string | undefined, status: ProviderInvoiceStatus | null): Observable<ProviderInvoice[]> {
    // const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${environment.token}`);

    let params = new HttpParams();
    if(startDate != null){
      params = params
      .set('startDate', startDate)
    }
    if(endDate != null){
      params = params
      .set('endDate', endDate)
    }
    if(status != null){
      params = params
      .set('status', status)
    }

    return this.httpClient.get<ProviderInvoice[]>(`${environment.baseUrl}provideInvoices/reservations/client`, { headers, params });
  }

  public getClientPropertiesServices(startDate: string | undefined, endDate: string | undefined, status: ProviderInvoiceStatus | null): Observable<ProviderInvoice[]> {
    // const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${environment.token}`);

    let params = new HttpParams();
    if(startDate != null){
      params = params
      .set('startDate', startDate)
    }
    if(endDate != null){
      params = params
      .set('endDate', endDate)
    }
    if(status != null){
      params = params
      .set('status', status)
    }

    return this.httpClient.get<ProviderInvoice[]>(`${environment.baseUrl}provideInvoices/properties/client`, { headers, params });
  }
}
