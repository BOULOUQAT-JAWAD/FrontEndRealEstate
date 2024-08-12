import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackBarComponent } from './custom-snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class CustomSnackBarService {

  constructor(private snackBar: MatSnackBar) {}

  show(message: string, icon: string, color: string, duration: number = 3000) {
    this.snackBar.openFromComponent(CustomSnackBarComponent, {
      data: {
        message: message,
        icon: icon,
      },
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [`custom-snack-bar-container`, color]
    });
  }
}