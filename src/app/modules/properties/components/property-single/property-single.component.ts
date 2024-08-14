import { Component, Input } from '@angular/core';
import { PropertyResponse } from '../../models/property-response';
import { Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-property-single',
  templateUrl: './property-single.component.html',
  styleUrls: ['./property-single.component.scss']
})
export class PropertySingleComponent {

  @Input() propertyData!: PropertyResponse;

  constructor(private router: Router, private propertyService: PropertyService, public dialog: MatDialog) { }

  onShow(property: PropertyResponse): void {
    // Implement your edit logic here
    console.log('Show clicked for:', property);
    this.router.navigate(['/properties', property.propertyId]);
  }

  onEdit(property: PropertyResponse): void {
    // Implement your edit logic here
    console.log('Edit clicked for:', property);
    this.router.navigate(['/property/edit', property.propertyId]);
  }

  onDelete(property: PropertyResponse) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.propertyService.deleteProperty(property.propertyId).subscribe(
          () => {
            console.log('Property deleted:'+property.propertyId);
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/properties']);
            });
          },
          error => {
            console.log('Error:'+error);

          }
        );
      }
    });
  }
}
