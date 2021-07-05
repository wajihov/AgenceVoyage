import { TestBed } from '@angular/core/testing';

import { RegisterCompanyService } from './register-company.service';

describe('RegisterCompanyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisterCompanyService = TestBed.get(RegisterCompanyService);
    expect(service).toBeTruthy();
  });
});
