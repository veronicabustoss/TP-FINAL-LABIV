import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/storage"
import { AuthService } from 'src/app/servicios/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']

})
export class HorariosComponent implements OnInit,OnChanges {

  @Input('especialista') auxEspecialista : any;
  @Input('fechaHijo') auxFecha : any;
  @Output() traerHorario = new EventEmitter();
  listaHorarios = [];
  listaHorariosAux = [];
  horaCargada;

  constructor( private st : AngularFireStorage,
    public authService : AuthService,
    private firestore : AngularFirestore,
    private datePipe: DatePipe) { }

  ngOnInit(): void {

   // this.calcularHorario(this.auxEspecialista);
  }

  ngOnChanges(change : SimpleChanges)
  {
    this.listaHorariosAux = [];
    let listaAux = this.listaHorariosAux;
    this.listaHorarios = [];
    console.log(change);

    listaAux = this.calcularHorario(listaAux);

    let fb = this.firestore.collection('turnos');
  
    fb.valueChanges().subscribe(datos =>{     

      datos.forEach( (dato:any) =>{

        listaAux.forEach(hora => {

            if(this.auxEspecialista.correo == dato.especialista.correo && hora == dato.horario )
            {
              let fecha = this.datePipe.transform(this.auxFecha, 'yyyy-MM-dd');
              console.log(fecha);
              if(fecha == dato.fecha)
              {
                let indice = listaAux.indexOf(hora);
                listaAux.splice(indice,1);
                this.listaHorarios  = listaAux;
              }
            }
            
        })
        
       });

      });
    
  }

  calcularHorario(lista :any) : Array<any>
  {

     for(let i = 8; i <= 19; i ++)
     {
            for(let j = 0; j <=45; j += 15 )
            {
              if(j == 0)
              {
                let horario = `${i}:${j}${j}`;
              
                lista.push(horario);
          }
          else
         {
          let horario = `${i}:${j}`;
          lista.push(horario);

        }
      }
    }

    return lista;

  }


  cargarHorario(e)
  {
    this.traerHorario.emit(this.horaCargada);

  }


}
