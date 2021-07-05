import { TestBed } from '@angular/core/testing';

import { AuthGuardCompanyService } from './auth-guard-company.service';

describe('AuthGuardCompanyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthGuardCompanyService = TestBed.get(AuthGuardCompanyService);
    expect(service).toBeTruthy();
  });
});
