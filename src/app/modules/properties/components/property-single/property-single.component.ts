import { Component, Input } from '@angular/core';
import { PropertyResponse } from '../../models/property-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-single',
  templateUrl: './property-single.component.html',
  styleUrls: ['./property-single.component.scss']
})
export class PropertySingleComponent {
  
  @Input() propertyData!: PropertyResponse;

  constructor(private router:Router){}

  onEdit(property: PropertyResponse): void {
    // Implement your edit logic here
    console.log('Edit clicked for:', property);
    this.router.navigate(['/property/edit', property.propertyId]);
  }

  onDelete(property: PropertyResponse): void {
    // Implement your delete logic here
    console.log('Delete clicked for:', property);
  }
}
