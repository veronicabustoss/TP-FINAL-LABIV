import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/storage"
import { AuthService } from 'src/app/servicios/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
import { DatabaseService } from 'src/app/servicios/database.service';

@Component({
  selector: 'app-listado-turnos-recepcionista',
  templateUrl: './listado-turnos-recepcionista.component.html',
  styleUrls: ['./listado-turnos-recepcionista.component.css']
})
export class ListadoTurnosRecepcionistaComponent implements OnInit {

  displayedColumns: string[] = ['Fecha','Horario', 'Nombre', 'Codigo','Estado','Accion'];
  correoUsuario;
  listaMisTurnos = [];
  banderaMostrar = false;
  turnoSeleccionado;

  constructor( private st : AngularFireStorage,
    public authService : AuthService,
    private firestore : AngularFirestore,
    private database : DatabaseService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {

  this.correoUsuario = localStorage.getItem('usuario');

  let fb = this.firestore.collection('usuarios');
  let fbDos = this.firestore.collection('turnos');
  
  fb.valueChanges().subscribe(usuarios =>{     
    this.listaMisTurnos = [];
    usuarios.forEach( (usuario:any) =>{
      
      fbDos.valueChanges().subscribe(turnos =>{  

        turnos.forEach( (turno:any) => {

          if(this.correoUsuario == usuario.correo)
          {
            if(usuario.perfil == 'recepcionista')
            {
                this.listaMisTurnos.push(turno);

            }

          }

        });

      })

    });
    
  });

  }


  estadoPaciente(turno,estado)
  {
      this.firestore.collection('turnos').get().subscribe((querySnapShot) => {
        querySnapShot.forEach((doc) => {
  
          if(doc.data().especialista.correo == turno.especialista.correo )
          {
            if(doc.data().fecha == turno.fecha  )
            {
              if(doc.data().horario == turno.horario)
              {
                if(turno.dni == doc.data().dni)
                {
                    let auxTurno = doc.data();
                    auxTurno.estado = estado;
                    this.database.actualizar('turnos',auxTurno,doc.id).then(finalizo => {
                      // window.location.reload()
                      this.ngOnInit();
                    })
             
                }
              }
            }

          }
  
         } )
     
      });
   

  }

  realizarResenia(turno)
  {
    this.banderaMostrar  = true;
    this.turnoSeleccionado = turno;
  }


  cambiarBandera(e)
  {
    this.banderaMostrar = e;
    this.ngOnInit();
  }

}
