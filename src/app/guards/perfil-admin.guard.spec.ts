import { TestBed } from '@angular/core/testing';

import { PerfilAdminGuard } from './perfil-admin.guard';

describe('PerfilAdminGuard', () => {
  let guard: PerfilAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PerfilAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
