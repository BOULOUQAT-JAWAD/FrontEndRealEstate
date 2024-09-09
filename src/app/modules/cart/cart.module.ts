import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';
import { SharedModule } from "../../shared/shared.module";
import { CartSuccessComponent } from './components/cart-success/cart-success.component';



@NgModule({
  declarations: [
    CartComponent,
    CartSuccessComponent
  ],
  exports : [
    CartComponent
  ],
  imports: [
    CommonModule,
    SharedModule
]
})
export class CartModule { }
