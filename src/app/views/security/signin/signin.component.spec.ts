import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, NgxsModule } from '@ngxs/store';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';

import { SigninComponent } from './signin.component';
import { of } from 'rxjs';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let storeSpy: { dispatch: jasmine.Spy, select: jasmine.Spy };

  beforeEach(async(() => {
    storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'select']);

    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([]), FormsModule, ReactiveFormsModule],
      declarations: [SigninComponent],
      providers: [
        { provide: Store, useValue: storeSpy },
        FormBuilder
      ]
    }).compileComponents();

    storeSpy.select.and.returnValue(of(null));
    storeSpy.dispatch.and.returnValue(of(null));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
