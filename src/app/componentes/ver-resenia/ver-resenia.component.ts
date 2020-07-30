import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ver-resenia',
  templateUrl: './ver-resenia.component.html',
  styleUrls: ['./ver-resenia.component.css']
})
export class VerReseniaComponent implements OnInit {

  @Input('turno') turno : any;
  @Output() volverAtras = new EventEmitter();
  formulario: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

  volverAtrasFuncion(e)
  {
    this.turno = null;
    this.volverAtras.emit(false);
    console.log(this.volverAtras);
  }

}
