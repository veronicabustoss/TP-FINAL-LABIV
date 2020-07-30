import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaRepcionistaComponent } from './alta-repcionista.component';

describe('AltaRepcionistaComponent', () => {
  let component: AltaRepcionistaComponent;
  let fixture: ComponentFixture<AltaRepcionistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaRepcionistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaRepcionistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
