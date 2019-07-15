import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appEmoji]'
})
export class EmojiDirective implements OnInit {
  @Input('appEmoji') emoji: string;
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.textContent += this.emoji;
  }
}
