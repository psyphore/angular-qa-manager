import { TestBed } from '@angular/core/testing';

import { GeneralServices } from './basic.service';

describe('BasicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneralServices = TestBed.inject(GeneralServices);
    expect(service).toBeTruthy();
  });
});
