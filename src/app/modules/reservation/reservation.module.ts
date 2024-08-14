import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationListComponent } from './components/reservation-list/reservation-list.component';
import { ReservationSingleComponent } from './components/reservation-single/reservation-single.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ReservationListComponent,
    ReservationSingleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
  ],
  exports: [
    ReservationListComponent,
  ]
})
export class ReservationModule { }
