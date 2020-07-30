import { Component, OnInit} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/storage"
import { AuthService } from 'src/app/servicios/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
import { DatabaseService } from 'src/app/servicios/database.service';

@Component({
  selector: 'app-lista-empleados-ingrean-al-sistema',
  templateUrl: './lista-empleados-ingrean-al-sistema.component.html',
  styleUrls: ['./lista-empleados-ingrean-al-sistema.component.css']
})
export class ListaEmpleadosIngreanAlSistemaComponent implements OnInit {

  
  displayedColumns: string[] = ['Fecha','Horario', 'Nombre', 'Perfil','Correo'];
  correoUsuario;
  listaUsuarios = [];
  banderaMostrar = false;
  turnoSeleccionado;

  constructor( private st : AngularFireStorage,
    public authService : AuthService,
    private firestore : AngularFirestore,
    private database : DatabaseService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
   
    setTimeout(() => {
        this.banderaMostrar = false;   
    }, 3000);
    this.banderaMostrar = true;
    this.listaUsuariosIngresanAlSistema();
  }

  boton()
  {
    this.listaUsuarios = [];
    this.ngOnInit();
  }


  listaUsuariosIngresanAlSistema() 
  {
    let fb = this.firestore.collection('usuarios');
    let fbDos = this.firestore.collection('ingresoSistema');
  
    fb.valueChanges().subscribe(usuarios =>{     

    usuarios.forEach( (usuario:any) =>{
      
      fbDos.valueChanges().subscribe(usuariosSistema =>{     

        usuariosSistema.forEach( (usuarioSistema:any) =>{
          
            if(usuario.perfil == 'recepcionista' || usuario.perfil == 'especialista')
            {
              if(usuario.correo == usuarioSistema.correo)
              {
                let auxHoraFecha = usuarioSistema.fechaHorario;
                let auxSplitHoraFecha = auxHoraFecha.split(" ",2);
                let jsonUsuario = {
                  nombre : usuario.nombre,
                  perfil : usuario.perfil,
                  fecha : auxSplitHoraFecha[0],
                  horario : auxSplitHoraFecha[1],
                  correo : usuario.correo,
                }

                this.listaUsuarios.push(jsonUsuario);
                console.log(jsonUsuario);
                console.log(this.listaUsuarios);
              }
            }

          });
        
        })

     
      });
    
    });

  }


}
