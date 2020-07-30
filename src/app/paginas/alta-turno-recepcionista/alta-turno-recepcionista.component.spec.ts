import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaTurnoRecepcionistaComponent } from './alta-turno-recepcionista.component';

describe('AltaTurnoRecepcionistaComponent', () => {
  let component: AltaTurnoRecepcionistaComponent;
  let fixture: ComponentFixture<AltaTurnoRecepcionistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaTurnoRecepcionistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaTurnoRecepcionistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
