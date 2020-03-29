import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Select } from '@ngxs/store';
import { SignInState } from '@root-store/sign-in-store/state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentPath: string;
  hasToken: boolean;
  @Input() title: string;
  @Select(SignInState.getToken) token$;
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(
      (_: NavigationEnd) => (this.currentPath = _.url)
    );
  }
}
