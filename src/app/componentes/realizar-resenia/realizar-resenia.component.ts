import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import * as firebase from 'firebase'
import { DatabaseService } from 'src/app/servicios/database.service';
// IMPORTO FIREBASE STORAGE
import {AngularFireStorage} from "@angular/fire/storage"
import { AuthService } from 'src/app/servicios/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertService } from 'src/app/servicios/alert.service';

@Component({
  selector: 'app-realizar-resenia',
  templateUrl: './realizar-resenia.component.html',
  styleUrls: ['./realizar-resenia.component.css']
})
export class RealizarReseniaComponent implements OnInit {

  @Input('turno') turno : any;
  @Output() volverAtras = new EventEmitter();
  formulario: FormGroup;
  resenia; 

  constructor(private database : DatabaseService,

    private frmbuilder: FormBuilder,
    private firestore : AngularFirestore,
    private alert : AlertService) { 

      this.formulario = this.frmbuilder.group( {
      reseniaValidar: ['', Validators.compose([Validators.required, Validators.minLength(66), Validators.maxLength(500)])],
      });
    }


  ngOnInit(): void {

  }

  mostrar()
  {
    console.log( this.formulario.controls);
  }


  enviarResenia(e)
  {
    this.firestore.collection('turnos').get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {

        if(this.turno.fecha == doc.data().fecha && this.turno.dni == doc.data().dni && this.turno.especialista.correo == doc.data().especialista.correo && this.turno.horario == doc.data().horario)
        {
          let auxTurno = doc.data();
          auxTurno.resenia = this.resenia;
          this.database.actualizar('turnos',auxTurno,doc.id).then(r => {
            this.turno = null;
            this.volverAtras.emit(false);
            this.alert.snackBarMensaje('¡Se realizo la reseña con exito!','Ok');

          })
        }
        
       } )
   
    });

  }

}
