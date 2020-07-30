import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEmpleadosIngreanAlSistemaComponent } from './lista-empleados-ingrean-al-sistema.component';

describe('ListaEmpleadosIngreanAlSistemaComponent', () => {
  let component: ListaEmpleadosIngreanAlSistemaComponent;
  let fixture: ComponentFixture<ListaEmpleadosIngreanAlSistemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaEmpleadosIngreanAlSistemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEmpleadosIngreanAlSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
