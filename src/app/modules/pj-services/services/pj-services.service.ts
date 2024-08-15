import { Injectable } from '@angular/core';
import { PjService } from '../models/pj-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/app/environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PjServicesService {
  public pjServices: PjService[] = []
  public pjService?: PjService;

  token: String = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huLmRvZTNAZXhhbXBsZS5jb20iLCJyb2xlcyI6IltDTElFTlRdIiwiZXhwIjoxNzIzNzM5NDU4fQ.owzeHJOmlPWZNXgKRGiBOEG4IpcLJW51hrbB3xMPdI8";

  constructor(
    private httpClient: HttpClient
  ) { }

  public getPjServicesForClient(): Observable<PjService[]> {
    // const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${environment.token}`);

    return this.httpClient.get<PjService[]>(`${environment.baseUrl}pjServices/client`, { headers });
  }

  public getPjServicesForVoyageur(): Observable<PjService[]> {
    // const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${environment.token}`);

    return this.httpClient.get<PjService[]>(`${environment.baseUrl}pjServices/voyageur`, { headers });
  }
}
