import { Component, OnInit} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/storage"
import { AuthService } from 'src/app/servicios/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
import { DatabaseService } from 'src/app/servicios/database.service';

@Component({
  selector: 'app-lista-empleados-turnos-realizados',
  templateUrl: './lista-empleados-turnos-realizados.component.html',
  styleUrls: ['./lista-empleados-turnos-realizados.component.css']
})
export class ListaEmpleadosTurnosRealizadosComponent implements OnInit {

  displayedColumns: string[] = ['Especialidad','Especialista', 'Fecha', 'Horario','Paciente','Turno echo por'];
  listadoTurnos = [];
  banderaMostrar = false;
  especialidadSeleccionada;
  listaEspecialistas = ['Cirugia','Odontologia','Peridoncia','Ortodoncia'];
  

  constructor( private st : AngularFireStorage,
    public authService : AuthService,
    private firestore : AngularFirestore,
    private database : DatabaseService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {

  }

  filtrarEspecialista()
  {
    this.listadoTurnos = [];

    let fb = this.firestore.collection('turnos');

    fb.valueChanges().subscribe(turnos =>{     

      turnos.forEach( (turno:any) =>{
        
          if(turno.realizadoPor.perfil == 'recepcionista')
          {
              if(turno.especialista.especialidad == this.especialidadSeleccionada)
              {
                this.listadoTurnos.push(turno);
              }
          }
       
        });
      
      });


  }

}
