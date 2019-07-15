import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentPath: string;
  @Input() title: string;
  constructor(private router: Router) {
    router.events.subscribe((_: NavigationEnd) => (this.currentPath = _.url));
  }

  ngOnInit() {}
}
