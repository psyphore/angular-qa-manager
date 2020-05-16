import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { Apollo } from 'apollo-angular';

import { PersonService } from './person.service';
import { of } from 'rxjs';

describe('PersonService', () => {
  let userId = 0;
  let httpClientSpy: { post: jasmine.Spy };
  let apolloSpy: { watchQuery: jasmine.Spy, mutate: jasmine.Spy, create: jasmine.Spy };
  let service: PersonService;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    apolloSpy = jasmine.createSpyObj('Apollo', ['watchQuery', 'mutate', 'create']);

    apolloSpy.watchQuery.and
      .returnValue({ valueChanges: of({ data: { person: {} } }) });

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ApolloTestingModule],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: Apollo, useValue: apolloSpy },
      ]
    });
    service = TestBed.inject(PersonService);
    userId = 6;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a get user function', () => {
    expect(service.getUser).toBeTruthy();
  });

  it('should be able to get all users', async () => {
    const payload = await service.getUser(userId);
    payload.subscribe(o => expect(o).toBeTruthy());
  });
});
