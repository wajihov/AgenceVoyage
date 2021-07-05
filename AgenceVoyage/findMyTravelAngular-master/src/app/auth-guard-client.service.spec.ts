import { TestBed } from '@angular/core/testing';

import { AuthGuardClientService } from './auth-guard-client.service';

describe('AuthGuardClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthGuardClientService = TestBed.get(AuthGuardClientService);
    expect(service).toBeTruthy();
  });
});
