import { EmojiDirective } from './emoji.directive';
import { TestBed } from '@angular/core/testing';

describe('EmojiDirective', () => {
  it('should create an instance', () => {
    let directive: EmojiDirective;
    directive = TestBed.inject(EmojiDirective);
    expect(directive).toBeTruthy();
  });
});
