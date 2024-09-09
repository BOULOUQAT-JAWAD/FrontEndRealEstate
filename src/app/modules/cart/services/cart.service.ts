import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { SubsCheckout } from 'src/app/shared/models/SubsCheckout.response';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  constructor(private localStorage: LocalStorageService,private httpClient: HttpClient) { }

  saveCartIntoStorage(cart: any) {
    this.localStorage.store('cart', cart);
  }

  isCartInStorage(): boolean {
    const cart = this.localStorage.retrieve('cart');
    return cart !== null && cart !== undefined;
  }

  getCartFromStorage(): any {
    const cart = this.localStorage.retrieve('cart');
    return cart ? JSON.parse(cart) : null;
  }

  clearCart() {
    this.localStorage.clear('cart');
  }

  checkout(finalCart:any) {
    return this.httpClient.post(`${environment.baseUrl}payment/checkout/pjServices`, finalCart);
  }
}
