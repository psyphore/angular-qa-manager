import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingComponent } from './landing.component';
import { environment } from '../../../environments/environment';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LandingComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have h1 title', () => {
    const jumbotron: HTMLElement = fixture.nativeElement;
    const h1 = jumbotron.querySelector('h1');
    expect(h1.textContent).toBe(environment.appName);
    expect(h1.className).toBe('display-4');
  });

  it('should have p subtitle', () => {
    const jumbotron: HTMLElement = fixture.nativeElement;
    const p = jumbotron.querySelector('p');
    expect(p.textContent).toBe('Where all great projects are put to the test');
    expect(p.className).toBe('lead');
  });
});
