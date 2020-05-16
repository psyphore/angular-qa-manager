import { EmojiDirective } from './emoji.directive';
import { TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  template: `<h2 appEmoji="😁">Smiley emoji</h2>`
})
class TestComponent { }

describe('EmojiDirective', () => {
  let elRefSpy: { nativeElement: jasmine.Spy };
  beforeEach(() => {
    elRefSpy = jasmine.createSpyObj('ElementRef', ['nativeElement']);
    TestBed.configureTestingModule({
      declarations: [EmojiDirective, TestComponent],
      providers: [
        { provide: ElementRef, useValue: elRefSpy }
      ]
    }).createComponent(TestComponent);

    elRefSpy.nativeElement.and.returnValue({ textContent: '' });
  });

  it('should create an instance', () => {
    let directive: EmojiDirective;
    directive = TestBed.inject(EmojiDirective);
    expect(directive).toBeTruthy();
  });
});
