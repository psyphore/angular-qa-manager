import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from '../../shared/services/security.service';

import { CallbackComponent } from './callback.component';
import { Router } from '@angular/router';

describe('CallbackComponent', () => {
  let component: CallbackComponent;
  let fixture: ComponentFixture<CallbackComponent>;
  let authServiceSpy: AuthService;
  let routerSpy: Router;

  beforeEach(async(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['']);
    routerSpy = jasmine.createSpyObj('Router', ['']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CallbackComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
