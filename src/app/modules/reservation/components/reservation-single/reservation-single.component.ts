import { Component, Input } from '@angular/core';
import { ReservationResponse } from '../../models/reservation-response';

@Component({
  selector: 'app-reservation-single',
  templateUrl: './reservation-single.component.html',
  styleUrls: ['./reservation-single.component.scss']
})
export class ReservationSingleComponent {

  @Input() reservation!: ReservationResponse;
}
