import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  RootStoreState,
  SignInStoreActions,
  SignInStoreSelectors
} from '../../../root-store/';

import { Observable } from 'rxjs';
import { SignInCredentials, SignIn } from '@models/security.interface';
import { AuthService } from '@services/security.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninComponent implements OnInit {
  signInFormGroup: FormGroup;
  errorMessage$: Observable<string>;
  isLoading$: Observable<boolean>;
  authenticated$: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store$: Store<RootStoreState.RootState>,
    private service$: AuthService
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.listenForStateChanges();
  }

  listenForStateChanges() {
    this.errorMessage$ = this.store$.select(
      SignInStoreSelectors.selectMyFeatureError
    );
    this.isLoading$ = this.store$.select(
      SignInStoreSelectors.selectMyFeatureIsLoading
    );
    this.authenticated$ = this.store$.select(
      SignInStoreSelectors.selectMyFeatureUser
    );
  }

  signIn() {
    if (this.signInFormGroup.invalid) {
      return;
    }

    try {
      const values = <SignInCredentials>{
        creds: { ...this.signInFormGroup.value }
      };
      // this.store$.dispatch(SignInStoreActions.signInRequest(values));

      this.service$.signIn(values).subscribe(
        (payload: SignIn) => {
          this.service$.setAuthorizationHeader(payload.login.jwt);
          this.router.navigate(['security/me']);
        },
        err => console.error('X failed to auth', err)
      );
      this.initializeForm();
    } catch (error) {
      console.error(error);
    }
  }

  initializeForm() {
    this.signInFormGroup = this.fb.group({
      identifier: ['siphoh', Validators.required],
      password: ['.c2h7GX3UMQ@FuV', Validators.required],
      provider: ['local', Validators.required]
    });
  }
}
