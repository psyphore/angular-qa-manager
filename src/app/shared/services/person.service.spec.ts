import { TestBed, async } from '@angular/core/testing';

import { PersonService } from './person.service';

describe('PersonService', () => {
  let userId = 0;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    userId = 6;
  });

  it('should be created', () => {
    const service: PersonService = TestBed.inject(PersonService);
    expect(service).toBeTruthy();
  });

  it('should have a get user function', () => {
    const service: PersonService = TestBed.inject(PersonService);
    expect(service.getUser).toBeTruthy();
  });

  it('should be able to get all users', async () => {
    const service: PersonService = TestBed.inject(PersonService);
    const payload = await service.getUser(userId);
    payload.subscribe(o => expect(o).toBeTruthy());
  });
});
