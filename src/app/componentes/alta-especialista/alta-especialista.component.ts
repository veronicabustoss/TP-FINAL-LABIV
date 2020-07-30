import { Component, OnInit, OnChanges , Input, SimpleChanges} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import * as firebase from 'firebase'
import { DatabaseService } from 'src/app/servicios/database.service';
// IMPORTO FIREBASE STORAGE
import {AngularFireStorage} from "@angular/fire/storage"
import { AuthService } from 'src/app/servicios/auth.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-alta-especialista',
  templateUrl: './alta-especialista.component.html',
  styleUrls: ['./alta-especialista.component.css']
})
export class AltaEspecialistaComponent implements OnInit {


  fotoPerfil = "https://clinicadentalcr.com/wp-content/uploads/2019/06/odontologia-png-2.png"
  archivo : File;
  preimagen :any;

  correo : string;
  password : string;
  dni : string;
  nombre : string;
  apellido : string;
  especialidad : string;


  formulario: FormGroup;

  hide = true;

  listaEspecialistas = ['Cirugia','Odontologia','Peridoncia','Ortodoncia'];


  constructor(private database : DatabaseService,
    private st : AngularFireStorage,
    private authService : AuthService,
    private frmbuilder: FormBuilder) { 

      this.formulario = this.frmbuilder.group( {

      contrasenia: ['', [Validators.required]],
      emailFormControl: ['', [Validators.required, Validators.email]],
      nombreFormControl : ['', [Validators.required]],
      dniFormControl : ['', Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(8)])],
      imagenFormControl : ['', [Validators.required]],
      apellidoFormControl : ['', [Validators.required]],
      especialidadFormControl : ['', [Validators.required]],
      });
    }

    handleImage(e: any):void{
      this.preimagen = e.target.files[0];  
    }

    ngOnInit(){

    }

    ngOnChanges(changes : SimpleChanges) {

    }

  cargarDatos()
  {
    // Colocar en un servicio y en una interface
    let jsonUsuario = {
      perfil : 'especialista',
      nombre : this.nombre,
      apellido : this.apellido,
      correo : this.correo,
      dni : this.dni,
      especialidad : this.especialidad,
      foto : '',
    }

    var storageRef = firebase.storage().ref();

    let referencia = `usuarios/${this.preimagen.name}`;

    var uploadTask = storageRef.child(referencia).put(this.preimagen).then(element => {

      console.log(this.preimagen.name);
      
      this.st.storage.ref(referencia).getDownloadURL().then((link) => {

        jsonUsuario.foto = link;
        this.database.crear('usuarios',jsonUsuario).then(resultado => {
          this.authService.registrarUsuario(this.correo,this.password);
        })
       
      })

    });
  
  }
 
}
