import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { AuthService } from '@services/security.service';
import * as MeActions from '@states/me/me.actions';
import { selectEntities } from '@states/me/me.selector';
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

  constructor(
    private router: Router,
    private authSvc: AuthService,
    private store$: Store<AppStore>
  ) {}

  ngOnInit() {
    this.errorMessage = null;
    try {
      this.store$.dispatch(MeActions.LoadMe());
      this.store$.pipe(select(selectEntities)).subscribe(d => {
        console.log(d);
        this.profile = d as any;
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
