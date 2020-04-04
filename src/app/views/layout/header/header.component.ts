import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { SignInState } from '@root-store/sign-in-store/state';
import { LoadOptions } from '@root-store/options-store/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentPath: string;
  hasToken: boolean;
  @Input() title: string;
  @Select(SignInState.isAuthenticated) token$;
  constructor(private router: Router, private store$: Store) { }

  ngOnInit() {
    this.router.events.subscribe(
      (_: NavigationEnd) => (this.currentPath = _.url)
    );
    this.store$.dispatch(new LoadOptions());
  }
}
