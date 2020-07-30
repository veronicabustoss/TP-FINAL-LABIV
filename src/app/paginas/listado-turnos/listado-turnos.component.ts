import { Component, OnInit} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/storage"
import { AuthService } from 'src/app/servicios/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
import { DatabaseService } from 'src/app/servicios/database.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-listado-turnos',
  templateUrl: './listado-turnos.component.html',
  styleUrls: ['./listado-turnos.component.css']
})
export class ListadoTurnosComponent implements OnInit {
 
  displayedColumns: string[] = ['Fecha','Horario', 'Nombre', 'Codigo','Estado','Accion'];
  dataSource = ELEMENT_DATA;
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
            if(usuario.perfil == 'especialista')
            {
              if(usuario.correo == turno.especialista.correo)
              {

                this.listaMisTurnos.push(turno);
              }
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
                  if(estado == 'atendiendo')
                  {
                    let auxTurno = doc.data();
                    auxTurno.estado = estado;
                    this.database.actualizar('turnos',auxTurno,doc.id).then(finalizo => {
                      // window.location.reload()
                      this.ngOnInit();
                    })
                  }
                  else if(estado == 'finalizado')
                  {
                    let auxTurno = doc.data();
                    auxTurno.estado = estado;
                    this.database.actualizar('turnos',auxTurno,doc.id).then(finalizo => {
                      // window.location.reload()
                      this.ngOnInit();
                    })
                  }
                  else{
                    let auxTurno = doc.data();
                    auxTurno.estado = estado;
                    this.database.actualizar('turnos',auxTurno,doc.id).then(finalizo => {
                      // window.location.reload()
                      this.ngOnInit();
                           // Salta snackbar
                    })
                  }
             
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
