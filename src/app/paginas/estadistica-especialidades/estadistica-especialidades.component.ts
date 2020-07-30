import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import {AngularFireStorage} from "@angular/fire/storage"
import { AuthService } from 'src/app/servicios/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
import { DatabaseService } from 'src/app/servicios/database.service';

@Component({
  selector: 'app-estadistica-especialidades',
  templateUrl: './estadistica-especialidades.component.html',
  styleUrls: ['./estadistica-especialidades.component.css']
})
export class EstadisticaEspecialidadesComponent implements OnInit {
 public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };



  public pieChartLabels: Label[] = ['Cirugia','Odontologia','Peridoncia','Ortodoncia'];
  public pieChartData: number[] = [0,0,0,0];
  public pieChartDataMenosUsados: number[] = [0,0,0,0];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)','rgba(244, 248, 9, 0.3)'],
    },
  ];

  constructor( private st : AngularFireStorage,
    public authService : AuthService,
    private firestore : AngularFirestore,
    private database : DatabaseService,
    private datePipe: DatePipe) { 

    }

  banderaMagica = false;

  ngOnInit() {

    let contador = {
      cirugia : 0,
      odontologia : 0,
      peridoncia : 0,
      ortodoncia : 0,
    } 
    


    this.pieChartDataMenosUsados[0] = 20;
    this.pieChartDataMenosUsados[1] = 20;
    this.pieChartDataMenosUsados[2] = 20;
    this.pieChartDataMenosUsados[3] = 20;

    let fb = this.firestore.collection('turnos');
    
    fb.valueChanges().subscribe(turnos =>{     
  
      turnos.forEach( (turno:any) =>{
        
       if(turno.especialista.especialidad == 'Peridoncia')
       {
         this.pieChartData[2] = contador.peridoncia += 1;

       }
       else if(turno.especialista.especialidad == 'Cirugia')
       {
        
        this.pieChartData[0] =contador.cirugia += 1;
       }
       else if(turno.especialista.especialidad == 'Odontologia')
       {
        this.pieChartData[1] =
          contador.odontologia += 1;
       }
       else if(turno.especialista.especialidad == 'Ortodoncia')
       {
        this.pieChartData[3] =contador.ortodoncia += 1;
       }
  
      });
      
    });
  }

 

}
