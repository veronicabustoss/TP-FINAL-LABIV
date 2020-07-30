import { TestBed } from '@angular/core/testing';

import { PerfilEspecialistaGuard } from './perfil-especialista.guard';

describe('PerfilEspecialistaGuard', () => {
  let guard: PerfilEspecialistaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PerfilEspecialistaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
