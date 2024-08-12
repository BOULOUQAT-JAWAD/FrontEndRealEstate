import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { CustomSnackBarComponent } from './custom-snack-bar/custom-snack-bar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    SpinnerComponent,
    CustomSnackBarComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatIconModule 
  ],
  exports: [
    SpinnerComponent,
    CustomSnackBarComponent
  ]
})
export class SharedModule { }
