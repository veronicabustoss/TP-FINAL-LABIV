import { Component, OnInit, OnChanges , Input, SimpleChanges} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import * as firebase from 'firebase'
import { DatabaseService } from 'src/app/servicios/database.service';
// IMPORTO FIREBASE STORAGE
import {AngularFireStorage} from "@angular/fire/storage"
import { AuthService } from 'src/app/servicios/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
import { AlertService } from 'src/app/servicios/alert.service';

@Component({
  selector: 'app-alta-turno',
  templateUrl: './alta-turno.component.html',
  styleUrls: ['./alta-turno.component.css']
})
export class AltaTurnoComponent implements OnInit {
 
  nombre : string;
  apellido : string;
  dni : string;
  formulario : FormGroup;
  especialistaCargado;
  listaConsultorios = [];

  listaHorarioTurno = [];
  listaEspecialistas = [];

    minDate: Date;
    maxDate: Date;
    fecha : Date;
    horaCargada;
  
  constructor(private database : DatabaseService,
    private st : AngularFireStorage,
    public authService : AuthService,
    private firestore : AngularFirestore,
    private frmbuilder: FormBuilder,
    private datePipe: DatePipe,
    private alert : AlertService) { 

      this.formulario = this.frmbuilder.group( {
      nombreFormControl : ['', [Validators.required]],
      dniFormControl : ['', [Validators.required]],
      apellidoFormControl : ['', [Validators.required]],
      fechaFormControl : ['', [Validators.required]],
      especialistaFormControl : ['', [Validators.required]],
      });
    }

 

  ngOnInit(): void {

    this.minDate = new Date();
    this.maxDate = new Date(2050,1,30);


    this.cargarEspecialista();


    let fb2 = this.firestore.collection('consultorios');
  
    fb2.valueChanges().subscribe(datos =>{  
      this.listaConsultorios = [];   
      datos.forEach( (dato:any) =>{
      if(dato.estado == 'desocupado')
      {
        this.listaConsultorios.push(dato.codigo);
      }

      });
      
    });
  

  }

  filtrarFecha = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
   return day !== 0;
  }

  consultorioAleatorio (): string
  {

    this.listaConsultorios = ['C01','C02','C03','C04','C05','C06','C07','LA1','LA2',]

    let aleatorio = Math.floor(Math.random()*(this.listaConsultorios.length));
    let seleccion = this.listaConsultorios[aleatorio];

    return seleccion
  }

  pedirTurno()
  {
    // Colocar en un servicio y en una interface
    let auxCorreo = localStorage.getItem('usuario');
    let fecha = this.datePipe.transform(this.fecha, 'yyyy-MM-dd');
    let jsonTurno = {
      nombre : this.nombre,
      apellido : this.apellido,
      dni : this.dni,
      especialista : this.especialistaCargado,
      horario : this.horaCargada,
      fecha : fecha,
      codigo : this.consultorioAleatorio(),
      correo : auxCorreo,
      estado : 'enEspera',
      resenia : '',
      realizadoPor: {
        perfil : 'paciente',
        correo : auxCorreo,
      },
      encuestaPaciente : {
        encuestaClinica : '',
        encuestaEspecialista : '',
        encuestaPersonal : ''
      }
    }

    //this.usuarioJSON.ingreso = new Date().toLocaleString() // ASIGNA LA FECHA DE INGRESO A: AHORA MISMO.

    this.database.crear('turnos',jsonTurno).then( r => {
      this.alert.snackBarMensaje(`El codigo de su turno es ${jsonTurno.codigo}`,'Ok');
      this.limpiarCampos();
    }).catch( e => { 
      this.alert.snackBarMensaje(`"Error al generar turno ${e}`,'Ok');
    })
    

  }

  cargarHorario(e)
  {
    this.horaCargada = e;
  }


  cargarEspecialista()
  {
    // Traemos los especialistas
    let fb = this.firestore.collection('usuarios');
  
    fb.valueChanges().subscribe(datos =>{     
      this.listaEspecialistas = [];
      datos.forEach( (dato:any) =>{
        
      if(dato.perfil == 'especialista')
      {
        this.listaEspecialistas.push(dato);
      }

      });
      
    });
  }

  limpiarCampos()
  {
    this.nombre = null; this.apellido = null; this.dni = null; this.especialistaCargado = ''; this.horaCargada = null; this.fecha = null;
  }


  /**
   * import { Injectable } from '@angular/core'; import {MatSnackBar} from '@angular/material/snack-bar';  @Injectable({   providedIn: 'root' }) export class ComplementosService {    constructor(private _snackBar: MatSnackBar) {}    snackBarMensaje(message: string, action: string) {     this._snackBar.open(message, action, {       duration: 4000,     });   }  }
   */

}
