import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import {AngularFireStorage} from "@angular/fire/storage"
import { AuthService } from 'src/app/servicios/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
import { DatabaseService } from 'src/app/servicios/database.service';


@Component({
  selector: 'app-estadistica-turnos',
  templateUrl: './estadistica-turnos.component.html',
  styleUrls: ['./estadistica-turnos.component.css']
})
export class EstadisticaTurnosComponent implements OnInit {

  displayedColumns: string[] = ['Especialidad','Especialista', 'Fecha', 'Horario','Paciente','Estado','Turno echo por'];
  especialidadSeleccionada;
  listaEspecialistas = ['Cirugia','Odontologia','Peridoncia','Ortodoncia'];
    
  listaTurnosCanceladosEspecialidad = [];
  listaTurnosRealizadosCliente = [];
  listaTurnosRecepcionista = [];
  mostrarTurnosCanceladosEspecialidad = false;
  mostrarTurnosRealizadosCliente = false;
  mostrarTurnosRecepcionista = false;

  constructor( private st : AngularFireStorage,
    public authService : AuthService,
    private firestore : AngularFirestore,
    private database : DatabaseService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {

    this.cargarListas(this.listaTurnosCanceladosEspecialidad,'noSePresento');
    this.cargarListas(this.listaTurnosRealizadosCliente,'paciente');
    this.cargarListas(this.listaTurnosRecepcionista,'recepcionista'); 
    
  }


  cargarListas(lista : any, condicion)
  {
    let fb = this.firestore.collection('turnos');

    fb.valueChanges().subscribe(turnos =>{     

      turnos.forEach( (turno:any) =>{
        
          if(turno.realizadoPor.perfil == condicion)
          {
            lista.push(turno);
          }
          if(turno.estado == condicion)
          {
            lista.push(turno);
          }
       
        });
      
      });

  }

  canceladosEspecialidad()
  {
    this.mostrarTurnosCanceladosEspecialidad = true;
    this.mostrarTurnosRealizadosCliente = false;
    this.mostrarTurnosRecepcionista = false;
  }

  realizadosCliente()
  {
    this.mostrarTurnosCanceladosEspecialidad = false;
    this.mostrarTurnosRealizadosCliente = true;
    this.mostrarTurnosRecepcionista = false;
  }

  realizadosRecepcionista()
  {
    this.mostrarTurnosCanceladosEspecialidad = false;
    this.mostrarTurnosRealizadosCliente = false;
    this.mostrarTurnosRecepcionista = true;
  }

}
