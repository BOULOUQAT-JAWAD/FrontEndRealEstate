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

    return this.httpClient.get<PropertyResponse[]>(`${environment.baseUrl}properties`, {   params });
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

     

    return this.httpClient.get<PropertyResponse[]>(`${environment.baseUrl}properties/occupied`, {   params });
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

     

    return this.httpClient.get<PropertyResponse[]>(`${environment.baseUrl}properties/available`, {   params });
  }

  public getProperty(id: number): Observable<PropertyResponse> {
    // const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
     

    return this.httpClient.get<PropertyResponse>(`${environment.baseUrl}properties/${id}`);
  }

  public getOneProperty(id: number): Observable<PropertyResponse> {
    // const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
     

    return this.httpClient.get<PropertyResponse>(`${environment.baseUrl}properties/home/${id}`);
  }

  public isPropertyAvailable(id: number, checkinDate: string, checkoutDate: string): Observable<boolean> {
    let params = new HttpParams().set('checkinDate', checkinDate).set('checkoutDate', checkoutDate);

    return this.httpClient.get<boolean>(`${environment.baseUrl}properties/home/${id}/available`,{params});
  }

  public saveOrUpdateProperty(request: PropertyRequest): Observable<PropertyResponse> {
    // const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
     

    return this.httpClient.post<PropertyResponse>(`${environment.baseUrl}properties`, request);
  }

  public deleteProperty(id: number): Observable<PropertyResponse> {
    // const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
     

    return this.httpClient.delete<PropertyResponse>(`${environment.baseUrl}properties/${id}`);
  }

  public getAllProperties(
    description?: string, 
    country?: string, 
    city?: string, 
    propertyType?: PropertyType, 
    checkinDate?: string, 
    checkoutDate?: string, 
    minNumberOfRooms?: number, 
    maxNumberOfRooms?: number,
    minNumberOfPersons?: number,
    maxNumberOfPersons?: number,
    minSurface?: number,
    maxSurface?: number,
    minPricePerNight?: number,
    maxPricePerNight?: number
  ): Observable<PropertyResponse[]> {
  
    let params = new HttpParams();
  
    if (description != null) {
      params = params.set('description', description);
    }
  
    if (city != null) {
      params = params.set('city', city);
    }
  
    if (country != null) {
      params = params.set('country', country);
    }
  
    if (propertyType != null) {
      params = params.set('propertyType', propertyType);
    }
  
    if (checkinDate != null) {
      params = params.set('checkinDate', checkinDate);
    }
  
    if (checkoutDate != null) {
      params = params.set('checkoutDate', checkoutDate);
    }
  
    if (minNumberOfRooms != null) {
      params = params.set('minNumberOfRooms', minNumberOfRooms.toString());
    }
  
    if (maxNumberOfRooms != null) {
      params = params.set('maxNumberOfRooms', maxNumberOfRooms.toString());
    }
  
    if (minNumberOfPersons != null) {
      params = params.set('minNumberOfPersons', minNumberOfPersons.toString());
    }
  
    if (maxNumberOfPersons != null) {
      params = params.set('maxNumberOfPersons', maxNumberOfPersons.toString());
    }
  
    if (minSurface != null) {
      params = params.set('minSurface', minSurface.toString());
    }
  
    if (maxSurface != null) {
      params = params.set('maxSurface', maxSurface.toString());
    }
  
    if (minPricePerNight != null) {
      params = params.set('minPricePerNight', minPricePerNight.toString());
    }
  
    if (maxPricePerNight != null) {
      params = params.set('maxPricePerNight', maxPricePerNight.toString());
    }
  
    return this.httpClient.get<PropertyResponse[]>(`${environment.baseUrl}properties/home/getAll`, { params });
  }
}
