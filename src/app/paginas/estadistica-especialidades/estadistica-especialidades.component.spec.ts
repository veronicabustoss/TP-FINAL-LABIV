import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaEspecialidadesComponent } from './estadistica-especialidades.component';

describe('EstadisticaEspecialidadesComponent', () => {
  let component: EstadisticaEspecialidadesComponent;
  let fixture: ComponentFixture<EstadisticaEspecialidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticaEspecialidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticaEspecialidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
