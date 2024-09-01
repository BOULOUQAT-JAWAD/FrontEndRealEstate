import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../../environment/environment";
import { PropertyResponse } from '../models/property-response';
import { Observable } from 'rxjs';
import { PropertyRequest } from '../models/property-request';
import { PropertyType } from '../models/property-type';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  public properties: PropertyResponse[] = []
  public property?: PropertyResponse;

  constructor(
    private httpClient: HttpClient
  ) { }

  public getClientProperties(publish: boolean | null, valid: boolean | null): Observable<PropertyResponse[]> {
    // const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${environment.token}`);

    console.log('publish : ' + publish)
    let params = new HttpParams();

    if (publish != null) {
      params = params
        .set('publish', publish);
    }

    if (valid != null) {
      params = params
        .set('valid', valid);
    }

    return this.httpClient.get<PropertyResponse[]>(`${environment.baseUrl}properties`, { headers, params });
  }

  public getClientOccupiedProperties(startDate: string, endDate: string, publish: boolean | null, valid: boolean | null): Observable<PropertyResponse[]> {
    // const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage

    let params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    if (publish != null) {
      params = params
        .set('publish', publish);
    }

    if (valid != null) {
      params = params
        .set('valid', valid);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${environment.token}`);

    return this.httpClient.get<PropertyResponse[]>(`${environment.baseUrl}properties/occupied`, { headers, params });
  }

  public getClientAvailableProperties(startDate: string, endDate: string, publish: boolean | null, valid: boolean | null): Observable<PropertyResponse[]> {
    // const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage

    let params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    if (publish != null) {
      params = params
        .set('publish', publish);
    }

    if (valid != null) {
      params = params
        .set('valid', valid);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${environment.token}`);

    return this.httpClient.get<PropertyResponse[]>(`${environment.baseUrl}properties/available`, { headers, params });
  }

  public getProperty(id: number): Observable<PropertyResponse> {
    // const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${environment.token}`);

    return this.httpClient.get<PropertyResponse>(`${environment.baseUrl}properties/${id}`, { headers });
  }

  public saveOrUpdateProperty(request: PropertyRequest): Observable<PropertyResponse> {
    // const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${environment.token}`);

    return this.httpClient.post<PropertyResponse>(`${environment.baseUrl}properties`, request, { headers });
  }

  public deleteProperty(id: number): Observable<PropertyResponse> {
    // const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${environment.token}`);

    return this.httpClient.delete<PropertyResponse>(`${environment.baseUrl}properties/${id}`, { headers });
  }

  public getAllProperties(description?: string, country?: string, city?: string, propertyType?: PropertyType, checkinDate?: string, checkoutDate?: string): Observable<PropertyResponse[]> {

    let params = new HttpParams();

    if (description != null) {
      params = params
        .set('description', description);
    }

    if (city != null) {
      params = params
        .set('city', city);
    }

    if (country != null) {
      params = params
        .set('country', country);
    }

    if (propertyType != null) {
      params = params
        .set('propertyType', propertyType);
    }

    if (checkinDate != null) {
      params = params
        .set('checkinDate', checkinDate);
    }

    if (checkoutDate != null) {
      params = params
        .set('checkoutDate', checkoutDate);
    }

    return this.httpClient.get<PropertyResponse[]>(`${environment.baseUrl}properties/getAll`, { params });
  }
}
