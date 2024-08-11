import { Component, Input } from '@angular/core';
import { PropertyResponse } from '../../models/property-response';

@Component({
  selector: 'app-property-single',
  templateUrl: './property-single.component.html',
  styleUrls: ['./property-single.component.scss']
})
export class PropertySingleComponent {
  
  @Input() propertyData!: PropertyResponse;

}
