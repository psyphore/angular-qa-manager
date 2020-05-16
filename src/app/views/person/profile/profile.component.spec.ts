import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { Apollo } from 'apollo-angular';

import { PersonService } from '../../../shared/services/person.service';
import { AuthService } from '../../../shared/services/security.service';
import { Person } from '../../../shared/interfaces';

import { ProfileComponent } from './profile.component';
import { of } from 'rxjs';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let httpClientSpy: { post: jasmine.Spy };
  let apolloSpy: { watchQuery: jasmine.Spy, mutate: jasmine.Spy, create: jasmine.Spy };
  let authServiceSpy: { profile: jasmine.Spy };
  let personServiceSpy: jasmine.SpyObj<PersonService>;
  beforeEach(async(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['profile']);
    personServiceSpy = jasmine.createSpyObj('PersonService', ['getUser', 'getUsers']);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    apolloSpy = jasmine.createSpyObj('Apollo', ['watchQuery', 'mutate', 'create']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ApolloTestingModule],
      declarations: [ProfileComponent],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: Apollo, useValue: apolloSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: PersonService, useValue: personServiceSpy },
      ]
    })
      .compileComponents();

    personServiceSpy.getUser.and.returnValue(of(<Person>{}));
    authServiceSpy.profile.and.returnValue({});
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
