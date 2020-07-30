import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { DatabaseService } from 'src/app/servicios/database.service';
import { AlertService } from 'src/app/servicios/alert.service';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  pickedName;
  email : string;
  password : string;
  listaUsuarios = [{ correo: 'admin@admin.com' , password : '123456'},
    { correo: 'recepcionista@recepcionista.com', password : '123456'},
    { correo: 'analia@recepcionista.com', password : '123456'},
    { correo: 'hector@especialista.com', password : '123456'},
    { correo: 'ramon@especialista.com', password : '123456'},
    { correo: 'valentinca@especialista.com', password : '123456'},
    { correo: 'veronica@paciente.com', password : '123456'},
    { correo: 'carlos@paciente.com', password : '123456'},]
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  contrasenia = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();

  hide = true;

  formulario: FormGroup;

  constructor(private authService : AuthService,
    private database : DatabaseService,
    private frmbuilder: FormBuilder,
    private alert : AlertService) { 
    this.formulario = this.frmbuilder.group( {

      pass: ['', [Validators.required]],
      emailControl: ['', [Validators.required, Validators.email]],

    });


  }

  ngOnInit(): void {
    
  }
  pickerUser(pickedName){
    this.listaUsuarios.forEach((user) =>{
      if(user.correo === pickedName)
      {
        this.email=user.correo;
        this.password=user.password;
        //localStorage.setItem("usuario",JSON.stringify(user));
        return;
      }
    })
  }
  iniciarSesion()
  {
    this.authService.login(this.email,this.password).then( exito => {
      this.inicioSesionAlSistema();
      this.alert.snackBarMensaje('Bienvenido!','Ok');
    }).catch( error => {
      this.alert.snackBarMensaje('Usuario no valido.','Ok');
    })
  }

  inicioSesionAlSistema()
  {
    let auxHoraFecha = new Date().toLocaleString()
    let jsonSistema = {
      fechaHorario : auxHoraFecha,
      correo : this.email,
    }

    this.database.crear('ingresoSistema',jsonSistema);
  }
 

}

