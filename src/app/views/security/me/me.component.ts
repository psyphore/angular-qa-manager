import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from '@services/security.service';
import { LoadSecurity } from '@states/security/security.actions';
import { selectAll } from '@states/security/me.selector';
import { AppStore } from '@models/store.interface';

import { Me } from '@models/security.interface';
import { first, flatMap } from 'rxjs/operators';

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
      this.store$.dispatch(new LoadSecurity());
      this.store$
        .select(selectAll)
        .pipe(
          first(),
          flatMap(d => d)
        )
        .subscribe(d => (this.profile = d));
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
