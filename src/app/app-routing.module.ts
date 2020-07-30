import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { AltaClienteComponent } from './componentes/alta-cliente/alta-cliente.component';
import { AltaTurnoComponent } from './componentes/alta-turno/alta-turno.component';
import { AltaEspecialistaComponent } from './componentes/alta-especialista/alta-especialista.component';
import { HomeComponent } from './paginas/home/home.component';
import { LogInGuard } from './guards/log-in.guard';
import { CerrarSesionGuard } from './guards/cerrar-sesion.guard';
import { AltaRepcionistaComponent } from './componentes/alta-repcionista/alta-repcionista.component';
import { MisTurnosComponent } from './paginas/mis-turnos/mis-turnos.component';
import { ListadoTurnosComponent } from './paginas/listado-turnos/listado-turnos.component';
import { ListadoTurnosRecepcionistaComponent } from './componentes/listado-turnos-recepcionista/listado-turnos-recepcionista.component';
import { AltaTurnoRecepcionistaComponent } from './paginas/alta-turno-recepcionista/alta-turno-recepcionista.component';
import { EstadisticaEmpleadosComponent } from './paginas/estadistica-empleados/estadistica-empleados.component';
import { EstadisticaTurnosComponent } from './paginas/estadistica-turnos/estadistica-turnos.component';
import { EstadisticaEspecialidadesComponent } from './paginas/estadistica-especialidades/estadistica-especialidades.component';
import { PerfilAdminGuard } from './guards/perfil-admin.guard';
import { PerfilRecepcionistaGuard } from './guards/perfil-recepcionista.guard';
import { PerfilPacienteGuard } from './guards/perfil-paciente.guard';
import { PerfilEspecialistaGuard } from './guards/perfil-especialista.guard';
import { ErrorComponent } from './paginas/error/error.component';


const routes: Routes = [
  
  {
    path : '',
    component : HomeComponent
  },
  {
    path : 'login',
    component : LoginComponent,
    canActivate : [CerrarSesionGuard]
  },
  {
    path : 'alta-cliente',
    component : AltaClienteComponent,
  },
  {
    path : 'alta-especialista',
    component : AltaEspecialistaComponent,
    canActivate : [LogInGuard, PerfilAdminGuard]
  },
  {
    path : 'alta-recepcionista',
    component : AltaRepcionistaComponent,
    canActivate : [LogInGuard,PerfilAdminGuard]
  },
  {
    path : 'mis-turnos',
    component : MisTurnosComponent,
    canActivate : [LogInGuard,PerfilPacienteGuard]
  },
  {
    path : 'alta-turno',
    component : AltaTurnoComponent,
    canActivate : [LogInGuard]
    // Turno no puede hacer el admin y el recepcionista
  },
  {
    path : 'listado-turnos',
    component : ListadoTurnosComponent,
    canActivate : [LogInGuard,PerfilEspecialistaGuard]
  },
  {
    path : 'alta-turno-recepcionista',
    component : AltaTurnoRecepcionistaComponent,
    canActivate : [LogInGuard],
    canActivateChild : [PerfilRecepcionistaGuard]
  },
  {
    path : 'estadistica-empleados',
    component : EstadisticaEmpleadosComponent,
    canActivate : [LogInGuard,PerfilAdminGuard],
  },
  {
    path : 'estadistica-turnos',
    component : EstadisticaTurnosComponent,
    canActivate : [LogInGuard,PerfilAdminGuard],
  },
  {
    path : 'estadistica-especialidades',
    component : EstadisticaEspecialidadesComponent,
    canActivate : [LogInGuard,PerfilAdminGuard],
  },

  {
    path : 'listado-turnos-recepcionista',
    component : ListadoTurnosRecepcionistaComponent,
    canActivate : [LogInGuard,PerfilRecepcionistaGuard],
  },
  {
    path : '**',
    component : ErrorComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
