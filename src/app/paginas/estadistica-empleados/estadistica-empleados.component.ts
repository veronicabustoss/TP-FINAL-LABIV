import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estadistica-empleados',
  templateUrl: './estadistica-empleados.component.html',
  styleUrls: ['./estadistica-empleados.component.css']
})
export class EstadisticaEmpleadosComponent implements OnInit {

  banderaMostrarIngresoSistema = false;
  banderaMostrarCantidadTurnos = false;

  constructor() { }

  ngOnInit(): void {
  }

  mostrarIngresoAlSistema()
  {
    this.banderaMostrarIngresoSistema = true;
    this.banderaMostrarCantidadTurnos = false;
  }

  mostrarCantidadTurnos()
  {
    this.banderaMostrarIngresoSistema = false;
    this.banderaMostrarCantidadTurnos = true;
  }

}
