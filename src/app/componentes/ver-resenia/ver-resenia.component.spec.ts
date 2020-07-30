import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerReseniaComponent } from './ver-resenia.component';

describe('VerReseniaComponent', () => {
  let component: VerReseniaComponent;
  let fixture: ComponentFixture<VerReseniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerReseniaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerReseniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
