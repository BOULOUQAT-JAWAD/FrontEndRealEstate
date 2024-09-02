import { Component, Input } from '@angular/core';
import { PropertyResponse } from '../../models/property-response';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss']
})
export class PropertyCardComponent {

  @Input() property!: PropertyResponse;

  constructor() { }
}
