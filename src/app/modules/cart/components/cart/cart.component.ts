import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { SubsCheckout } from 'src/app/shared/models/SubsCheckout.response';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {

  isCartEmpty: boolean = true;
  cart: any = { propertyServiceCheckouts: [] }; // Initialize with an empty object to prevent undefined errors
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.checkIfCartEmpty();
    if (!this.isCartEmpty) {
      this.loadCartData();
      this.calculateTotal();
    }
  }

  checkIfCartEmpty() {
    if (this.cartService.isCartInStorage()) {
      this.isCartEmpty = false;
    }
  }

  loadCartData() {
    this.cart = this.cartService.getCartFromStorage();
  }

  calculateTotal() {
    this.total = this.cart.propertyServiceCheckouts.reduce((total: number, property: any) => {
      return total + this.calculateSubtotal(property.pjServicesIds);
    }, 0);
  }

  calculateSubtotal(services: string[]): number {
    return services.reduce((subTotal: number, service: string) => {
      // Extract the price (assuming it's after the last dash) and handle undefined
      const price = parseFloat(service.split('-').pop() ?? '0');
      return subTotal + price;
    }, 0);
  }
  

  // Prepare the cart for checkout
  prepareCheckoutData() {
    return this.cart.propertyServiceCheckouts.map((property: any) => ({
      propertyId: property.propertyId.split('-')[0] ?? '', // Extract only the ID, fallback to empty string
      pjServicesIds: property.pjServicesIds.map((service: string) => service.split('-')[0] ?? '') // Extract only the service ID, fallback to empty string
    }));
  }
  

  checkout() {
    const propertyServiceCheckouts = this.prepareCheckoutData();
    const finalCheckoutRequest = { propertyServiceCheckouts }
    console.log('Sending checkout data:', finalCheckoutRequest);
    this.cartService.checkout(finalCheckoutRequest).subscribe(
      (data: any) => {
        console.log(data)
        this.cartService.clearCart()
        window.location.href = data.checkoutUrl;
      },
      error => {
        console.error('Error while trying to subscribe ', error);
      }
    )
  }

}

