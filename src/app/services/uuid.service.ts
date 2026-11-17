import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UuidService {

  constructor(private _snackBar: MatSnackBar) {}

  getUuid(): string {
    return crypto.randomUUID();
  }

  snackbar(msg: string) {
    return this._snackBar.open(msg, 'close', {
      duration: 3000,
      horizontalPosition: 'left',
      verticalPosition: 'top'
    });
  }
}