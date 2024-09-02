import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientSubscription } from '../models/ClientSubscription.response';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { SubsCheckout } from '../models/SubsCheckout.response';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {


  constructor(private http:HttpClient,private authService:AuthService) { }


  public getClientSubscription(): Observable<ClientSubscription> {
    const userId = this.authService.getUserId();  
    return this.http.get<ClientSubscription>(`${environment.baseUrl}client/subscription/${userId}`);
  }

  subscribeClient() : Observable<SubsCheckout>{
    return this.http.post<SubsCheckout>(`${environment.baseUrl}payment/checkout/subscription`,null);
  }

}
