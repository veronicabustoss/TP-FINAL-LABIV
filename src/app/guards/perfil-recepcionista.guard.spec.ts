import { TestBed } from '@angular/core/testing';

import { PerfilRecepcionistaGuard } from './perfil-recepcionista.guard';

describe('PerfilRecepcionistaGuard', () => {
  let guard: PerfilRecepcionistaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PerfilRecepcionistaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
