import { TestBed } from '@angular/core/testing';

import { PerfilPacienteGuard } from './perfil-paciente.guard';

describe('PerfilPacienteGuard', () => {
  let guard: PerfilPacienteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PerfilPacienteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
