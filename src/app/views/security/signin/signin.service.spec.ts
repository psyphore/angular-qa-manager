import { TestBed, fakeAsync } from '@angular/core/testing';

import { SignInService } from './signin.service';
import { SignInCredentials } from '../../../shared/interfaces/security.interface';

describe('SignInService', () => {
  let service$: SignInService;
  let testData: SignInCredentials;

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    service$ = TestBed.get(SignInService);
    expect(service$).toBeTruthy();
  });

  it('should have a signIn function', () => {
    service$ = TestBed.get(SignInService);

    testData = <SignInCredentials>{
      creds: {
        identifier: 'test-user',
        password: 'verySecurePassword',
        provider: 'auth0'
      }
    };

    expect(testData).toBeTruthy();
    expect(service$.SignIn(testData)).not.toThrowError();
  });
});
