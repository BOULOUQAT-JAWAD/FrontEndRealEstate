import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { CustomSnackBarComponent } from './custom-snack-bar/custom-snack-bar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ClientSidebarComponent } from './client-sidebar/client-sidebar.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    CustomSnackBarComponent,
    ConfirmDialogComponent,
    ClientSidebarComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    SpinnerComponent,
    CustomSnackBarComponent,
    ClientSidebarComponent
  ]
})
export class SharedModule { }
