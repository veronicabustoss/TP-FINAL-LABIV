import { Component, OnInit} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/storage"
import { AuthService } from 'src/app/servicios/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';

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
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent implements OnInit {

  displayedColumns: string[] = ['Nombre', 'Codigo', 'Especialista', 'Fecha','Horario','Estado','Accion'];
  dataSource = ELEMENT_DATA;
  correoUsuario;
  listaMisTurnos = [];
  banderaMostrar = false;
  banderaResenia = false;
  turnoSeleccionado;

  constructor( private st : AngularFireStorage,
    public authService : AuthService,
    private firestore : AngularFirestore,
    private datePipe: DatePipe) { }

  ngOnInit(): void {

    this. listaMisTurnos = [];
  this.correoUsuario = localStorage.getItem('usuario');

  let fb = this.firestore.collection('usuarios');
  let fbDos = this.firestore.collection('turnos');
  
  fb.valueChanges().subscribe(usuarios =>{     

    usuarios.forEach( (usuario:any) =>{
      
      fbDos.valueChanges().subscribe(turnos =>{  

        turnos.forEach( (turno:any) => {

          if(this.correoUsuario == usuario.correo)
          {
            if(usuario.perfil == 'paciente')
            {
              if(usuario.correo == turno.correo)
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


  mostrarFormularioEncuesta(turno : any)
  {
    this.turnoSeleccionado = turno;
    this.banderaMostrar = true;
    this.banderaResenia = false;
  }

  mostrarResenia(turno : any)
  {
    this.turnoSeleccionado = turno;
    this.banderaResenia = true;
    this.banderaMostrar = false;
  }

  cambiarBandera(e)
  {
    this.banderaMostrar = e;
    this.ngOnInit();
  }

  cambiarBanderaResenia(e)
  {
    this.banderaResenia = e;
    this.ngOnInit();
  }


}
