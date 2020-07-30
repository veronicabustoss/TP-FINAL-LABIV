import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular material Componentes
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import { MenuComponent } from './paginas/menu/menu.component';

import {AngularFirestore} from "@angular/fire/firestore";

import { AngularFireModule } from "@angular/fire";

// IMPORTO EL MODULO DE AUTENTIFICACION

import { AngularFireAuthModule} from "@angular/fire/auth";


import {AngularFireStorageModule} from "@angular/fire/storage";
import { ChartsModule } from 'ng2-charts';

import { environment } from "../environments/environment";
import { LoginComponent } from './componentes/login/login.component';
import { AltaClienteComponent } from './componentes/alta-cliente/alta-cliente.component';
import { AltaEspecialistaComponent } from './componentes/alta-especialista/alta-especialista.component';
import { AltaRepcionistaComponent } from './componentes/alta-repcionista/alta-repcionista.component';
import { ErrorComponent } from './paginas/error/error.component';

import { JwtModule } from "@auth0/angular-jwt";
import { AltaTurnoComponent } from './componentes/alta-turno/alta-turno.component';
import { HomeComponent } from './paginas/home/home.component';
import { HorariosComponent } from './componentes/horarios/horarios.component';
import { DatePipe } from '@angular/common';
import { ListadoTurnosComponent } from './paginas/listado-turnos/listado-turnos.component';
import { MisTurnosComponent } from './paginas/mis-turnos/mis-turnos.component';
import { ReseniaComponent } from './componentes/resenia/resenia.component';
import { HacerEncuestaComponent } from './componentes/hacer-encuesta/hacer-encuesta.component';
import { RealizarReseniaComponent } from './componentes/realizar-resenia/realizar-resenia.component';
import { VerReseniaComponent } from './componentes/ver-resenia/ver-resenia.component';
import { ListadoTurnosRecepcionistaComponent } from './componentes/listado-turnos-recepcionista/listado-turnos-recepcionista.component';
import { EstadisticaEmpleadosComponent } from './paginas/estadistica-empleados/estadistica-empleados.component';
import { EstadisticaTurnosComponent } from './paginas/estadistica-turnos/estadistica-turnos.component';
import { EstadisticaEspecialidadesComponent } from './paginas/estadistica-especialidades/estadistica-especialidades.component';
import { AltaTurnoRecepcionistaComponent } from './paginas/alta-turno-recepcionista/alta-turno-recepcionista.component';
import { ListaEmpleadosIngreanAlSistemaComponent } from './componentes/lista-empleados-ingrean-al-sistema/lista-empleados-ingrean-al-sistema.component';
import { ListaEmpleadosTurnosRealizadosComponent } from './componentes/lista-empleados-turnos-realizados/lista-empleados-turnos-realizados.component';


export function tokenGetter() {
  return localStorage.getItem("token");
}
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    AltaClienteComponent,
    AltaEspecialistaComponent,
    AltaRepcionistaComponent,
    ErrorComponent,
    AltaTurnoComponent,
    HomeComponent,
    HorariosComponent,
    ListadoTurnosComponent,
    MisTurnosComponent,
    ReseniaComponent,
    HacerEncuestaComponent,
    RealizarReseniaComponent,
    VerReseniaComponent,
    ListadoTurnosRecepcionistaComponent,
    EstadisticaEmpleadosComponent,
    EstadisticaTurnosComponent,
    EstadisticaEspecialidadesComponent,
    AltaTurnoRecepcionistaComponent,
    ListaEmpleadosIngreanAlSistemaComponent,
    ListaEmpleadosTurnosRealizadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatNativeDateModule,
    ChartsModule,
    AngularFireStorageModule, // <- Agregue
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
      
    }),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
