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
  selector: 'app-hacer-encuesta',
  templateUrl: './hacer-encuesta.component.html',
  styleUrls: ['./hacer-encuesta.component.css']
})
export class HacerEncuestaComponent implements OnInit {

  @Input('turno') turno : any;
  @Output() volverAtras = new EventEmitter();
  formulario: FormGroup;
  encuestaPersonal ;
  encuestaEspecialista;
  encuestaClinica;

  constructor(private database : DatabaseService,
    private frmbuilder: FormBuilder,
    private firestore : AngularFirestore,
    private authS : AuthService,
    private alert : AlertService) { 

      this.formulario = this.frmbuilder.group( {
      encuestaValidar: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(66)])],
      especialistaPuntuacionValidar : ['', Validators.required],
      clinicaPuntuacionValidar : ['', Validators.required],
    });
    }
  ngOnInit(): void {
  }

  volverAtrasFuncion(e)
  {
    this.turno = null;
    this.volverAtras.emit(false);
    console.log(this.volverAtras);
  }

  realizarEncuesta(e)
  {
    
    this.firestore.collection('turnos').get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {

        if(this.turno.fecha == doc.data().fecha && this.turno.dni == doc.data().dni && this.turno.especialista.correo == doc.data().especialista.correo && this.turno.horario == doc.data().horario && this.authS.devolverCorreo() == doc.data().correo)
        {
          let auxTurno = doc.data();
          auxTurno.encuestaPaciente.encuestaClinica = this.encuestaClinica;
          auxTurno.encuestaPaciente.encuestaEspecialista = this.encuestaEspecialista;
          auxTurno.encuestaPaciente.encuestaPersonal = this.encuestaPersonal;

          this.database.actualizar('turnos',auxTurno,doc.id).then(r => {
            this.turno = null;
            this.volverAtras.emit(false);
            this.alert.snackBarMensaje('¡Se realizo la encuesta con exito!','Ok');

          })
        }
        
       } )
   
    });

  }

  formatLabel(value: number) {
    if (value >= 10) {
      return value ;
    }

    return value;
  }

}
