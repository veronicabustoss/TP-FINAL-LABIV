import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoTurnosRecepcionistaComponent } from './listado-turnos-recepcionista.component';

describe('ListadoTurnosRecepcionistaComponent', () => {
  let component: ListadoTurnosRecepcionistaComponent;
  let fixture: ComponentFixture<ListadoTurnosRecepcionistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoTurnosRecepcionistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoTurnosRecepcionistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
