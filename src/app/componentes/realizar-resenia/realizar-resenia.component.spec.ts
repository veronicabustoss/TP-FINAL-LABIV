import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarReseniaComponent } from './realizar-resenia.component';

describe('RealizarReseniaComponent', () => {
  let component: RealizarReseniaComponent;
  let fixture: ComponentFixture<RealizarReseniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealizarReseniaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealizarReseniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
