import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaEmpleadosComponent } from './estadistica-empleados.component';

describe('EstadisticaEmpleadosComponent', () => {
  let component: EstadisticaEmpleadosComponent;
  let fixture: ComponentFixture<EstadisticaEmpleadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticaEmpleadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticaEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
