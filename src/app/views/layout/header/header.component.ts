import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { SignInStoreState } from '@root-store/sign-in-store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentPath: string;
  hasToken: boolean;
  @Input() title: string;
  constructor(private router: Router, private store$: Store) {}

  ngOnInit() {
    this.router.events.subscribe(
      (_: NavigationEnd) => (this.currentPath = _.url)
    );
    this.hasToken =
      this.store$.selectSnapshot(SignInStoreState.SignInState.getToken) !==
      null;
  }
}
