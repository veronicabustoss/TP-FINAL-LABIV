import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HacerEncuestaComponent } from './hacer-encuesta.component';

describe('HacerEncuestaComponent', () => {
  let component: HacerEncuestaComponent;
  let fixture: ComponentFixture<HacerEncuestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HacerEncuestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HacerEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
