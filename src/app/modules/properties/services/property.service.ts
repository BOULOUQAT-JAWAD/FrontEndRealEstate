import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environment/environment";
import { PropertyResponse } from '../models/property-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  public properties:PropertyResponse[]=[]
  public property?:PropertyResponse;
  token:String = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huLmRvZTNAZXhhbXBsZS5jb20iLCJyb2xlcyI6IltDTElFTlRdIiwiZXhwIjoxNzIzNDU2MzkyfQ.-d2VMLeuEVfgBE_7Ad2-IuORFhdezU0tOUcG5D23Rt4";
  
  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllProperties(): Observable<PropertyResponse[]> {
    // const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    return this.httpClient.get<PropertyResponse[]>(`${environment.baseUrl}properties`, { headers });
  }
  
  public getProperty(id: String): Observable<PropertyResponse> {
    // const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    return this.httpClient.get<PropertyResponse>(`${environment.baseUrl}properties/${id}`, { headers });
  }
}
