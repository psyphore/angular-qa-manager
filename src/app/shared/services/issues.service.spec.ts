import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { Apollo } from 'apollo-angular';

import { IssuesService } from './issues.service';

describe('IssuesService', () => {
  let httpClientSpy: { post: jasmine.Spy };
  let apolloSpy: { watchQuery: jasmine.Spy, mutate: jasmine.Spy, create: jasmine.Spy };
  let service: IssuesService;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    apolloSpy = jasmine.createSpyObj('Apollo', ['watchQuery', 'mutate', 'create']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ApolloTestingModule],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: Apollo, useValue: apolloSpy },
      ]
    });
    service = TestBed.inject(IssuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
