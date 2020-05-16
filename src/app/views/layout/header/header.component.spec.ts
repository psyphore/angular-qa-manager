import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, NgxsModule } from '@ngxs/store';

import { HeaderComponent } from './header.component';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let storeSpy: { dispatch: jasmine.Spy, select: jasmine.Spy };
  beforeEach(async(() => {
    storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NgxsModule.forRoot([])],
      declarations: [HeaderComponent],
      providers: [
        { provide: Store, useValue: storeSpy }
      ]
    })
      .compileComponents();

    storeSpy.select.and.returnValue(of(null));
    storeSpy.dispatch.and.returnValue(of(null));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
