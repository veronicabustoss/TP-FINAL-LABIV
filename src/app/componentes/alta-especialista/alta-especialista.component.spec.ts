import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaEspecialistaComponent } from './alta-especialista.component';

describe('AltaEspecialistaComponent', () => {
  let component: AltaEspecialistaComponent;
  let fixture: ComponentFixture<AltaEspecialistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaEspecialistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
