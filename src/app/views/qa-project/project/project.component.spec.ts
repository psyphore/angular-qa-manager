import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, NgxsModule } from '@ngxs/store';

import { ProjectComponent } from './project.component';
import { of } from 'rxjs';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  let storeSpy: { dispatch: jasmine.Spy, select: jasmine.Spy };
  beforeEach(async(() => {
    storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([])],
      declarations: [ProjectComponent],
      providers: [
        { provide: Store, useValue: storeSpy }
      ]
    })
      .compileComponents();
    storeSpy.select.and.returnValue(of(null));
    storeSpy.dispatch.and.returnValue(of(null));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
