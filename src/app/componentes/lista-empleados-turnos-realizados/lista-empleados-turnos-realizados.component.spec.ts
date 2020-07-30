import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEmpleadosTurnosRealizadosComponent } from './lista-empleados-turnos-realizados.component';

describe('ListaEmpleadosTurnosRealizadosComponent', () => {
  let component: ListaEmpleadosTurnosRealizadosComponent;
  let fixture: ComponentFixture<ListaEmpleadosTurnosRealizadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaEmpleadosTurnosRealizadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEmpleadosTurnosRealizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
