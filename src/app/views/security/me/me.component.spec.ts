import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, NgxsModule } from '@ngxs/store';

import { MeComponent } from './me.component';
import { of } from 'rxjs';

describe('MeComponent', () => {
  let component: MeComponent;
  let fixture: ComponentFixture<MeComponent>;
  let storeSpy: { dispatch: jasmine.Spy, select: jasmine.Spy };

  beforeEach(async(() => {
    storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([])],
      declarations: [MeComponent],
      providers: [{ provide: Store, useValue: storeSpy }]
    })
      .compileComponents();

    storeSpy.select.and.returnValue(of(null));
    storeSpy.dispatch.and.returnValue(of(null));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
