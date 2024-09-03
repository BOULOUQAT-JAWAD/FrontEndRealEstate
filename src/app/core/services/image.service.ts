import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public uploadImages(request: FormData): Observable<string[]> {
    // const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
     

    return this.httpClient.post<string[]>(`${environment.baseUrl}images/upload`, request);
  }
}
