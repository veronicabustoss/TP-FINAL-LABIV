import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaTurnosComponent } from './estadistica-turnos.component';

describe('EstadisticaTurnosComponent', () => {
  let component: EstadisticaTurnosComponent;
  let fixture: ComponentFixture<EstadisticaTurnosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticaTurnosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticaTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
