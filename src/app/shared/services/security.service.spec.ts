import { TestBed } from '@angular/core/testing';

import { AuthService } from './security.service';

describe('SecurityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
