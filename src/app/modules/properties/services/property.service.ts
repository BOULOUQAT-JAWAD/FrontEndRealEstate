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

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllProperties(): Observable<PropertyResponse[]> {
    // const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huLmRvZTNAZXhhbXBsZS5jb20iLCJyb2xlcyI6IltDTElFTlRdIiwiZXhwIjoxNzIzNDA1Mzg1fQ.WdZ6IF6aiPF18UsiwrAQKyQK0SAoiTFRx3L2C4qXD6A";
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.get<PropertyResponse[]>(`${environment.baseUrl}properties`, { headers });
  }
  
}
