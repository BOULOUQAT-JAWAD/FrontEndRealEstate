import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDashboardComponent } from './components/my-dashboard/my-dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReservationModule } from '../reservation/reservation.module';
import { ProviderInvoicesModule } from '../provider-invoices/provider-invoices.module';



@NgModule({
  declarations: [
    MyDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReservationModule,
    ProviderInvoicesModule
  ],
  exports:[
    MyDashboardComponent
  ]
})
export class ClientDashboardModule { }
