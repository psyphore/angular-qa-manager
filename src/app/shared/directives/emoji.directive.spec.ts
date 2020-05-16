import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { EmojiDirective } from './emoji.directive';

@Component({
  template: `<h2 appEmoji="😁">Smiley emoji</h2>`
})
export class TestComponent { }

describe('EmojiDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let debugElement: DebugElement;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmojiDirective, TestComponent],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    element = debugElement.nativeElement;
  });

  it('should create an instance', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it(`should have a 😁 emoji`, () => {
    fixture.detectChanges();
    const directive = debugElement.query(By.directive(EmojiDirective));
    fixture.detectChanges();
    expect(directive.nativeElement.textContent).toContain('😁');
  });

});
