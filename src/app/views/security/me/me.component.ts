import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { AuthService } from '@services/security.service';

import {
  RootStoreState,
  MeStoreActions,
  MeStoreSelectors
} from '../../../root-store/';

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
    private service$: AuthService,
    private store$: Store<RootStoreState.RootState>
  ) {}

  ngOnInit() {
    this.errorMessage = null;
    try {
      // this.store$.dispatch(MeStoreActions.loadProfile());
      // this.store$
      //   .pipe(select(MeStoreSelectors.selectMyFeatureOptions))
      //   .subscribe(d => {
      //     console.log(d);
      //     this.profile = d as Me;
      //   });

      this.service$.me().subscribe(
        (payload: Me) => {
          this.profile = payload;
        },
        err => console.error('X failed to load me', err)
      );
    } catch (err) {
      this.handleError(err);
    }
  }

  private clearSessionStore(): void {
    this.service$.removeSessionItem('id_token');
    this.router.navigate(['security/signin']);
  }

  private handleError(err: any): void {
    console.error(err);
    this.errorMessage = err;
    this.clearSessionStore();
  }
}
