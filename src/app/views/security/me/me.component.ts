import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { AuthService } from '@services/security.service';
// import * as MeActions from '@states/me/me.actions';
// import { selectEntities } from '@states/me/me.selector';
// import { AppStore } from '@models/store.interface';

import {
  RootStoreState,
  MeStoreActions,
  MeStoreSelectors
} from '../../../root-store/';

import { Observable } from 'rxjs';

import { Me } from '@models/security.interface';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {
  public errorMessage: string = null;
  public profile: Me = null;

  constructor(
    private router: Router,
    private authSvc: AuthService,
    private store$: Store<RootStoreState.RootState>
  ) {}

  ngOnInit() {
    this.errorMessage = null;
    try {
      this.store$.dispatch(new MeStoreActions.LoadRequestAction());
      this.store$
        .pipe(select(MeStoreSelectors.selectMyFeatureOptions))
        .subscribe(d => {
          console.log(d);
          this.profile = d as Me;
        });
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
