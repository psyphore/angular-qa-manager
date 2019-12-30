import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthService, StrapiAuthService } from '@services/security.service';
import * as SecurityActions from '@states/security/security.actions';
import * as SecuritySelectors from '@states/security/security.selector';
import { AppStore } from '@models/store.interface';

import { Me } from '@models/security.interface';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {
  public errorMessage: string = null;
  public profile: Me = null;
  public profile$: Observable<Me | any>;

  constructor(
    private router: Router,
    private service: StrapiAuthService,
    private authSvc: AuthService,
    private store$: Store<AppStore>
  ) {}

  ngOnInit() {
    this.errorMessage = null;
    try {
      if (this.authSvc.hasToken()) {
        this.store$.dispatch(new SecurityActions.LoadSecurity(null));
        this.profile$ = this.store$.select(SecuritySelectors.selectAll);
        this.profile$.subscribe(
          d => console.log(d),
          e => console.error(e),
          () => console.log('done')
        );
        /*
        this.service.me().subscribe(
          res => (this.profile = res),
          error => this.handleError(error)
        );
        */
      }
    } catch (err) {
      this.handleError(err);
    }
  }

  private clearSessionStore(): void {
    this.authSvc.removeSessionItem('id_token');
    this.router.navigate(['security/signin']);
  }

  private handleError(err: any): void {
    console.error(err);
    this.errorMessage = err;
    this.clearSessionStore();
  }
}
