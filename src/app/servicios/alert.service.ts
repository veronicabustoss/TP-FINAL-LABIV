import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private _snackBar: MatSnackBar) {}

  snackBarMensaje(message: string, action: string) {     
    this._snackBar.open(message, action, {       duration: 4000,     });
     }  
  

}
