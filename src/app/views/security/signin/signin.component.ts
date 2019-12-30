import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as SecurityActions from '@states/security/security.actions';
import { AppStore } from '@models/store.interface';

import { SignInCredentials, SignIn } from '@models/security.interface';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninComponent implements OnInit {
  public signInFormGroup: FormGroup;
  public errorMessage: string = null;
  public credentials: SignInCredentials = {} as SignInCredentials;
  public authorization$: Observable<SignIn | any>;

  constructor(private fb: FormBuilder, private store$: Store<AppStore>) {}

  ngOnInit() {
    this.initializeForm();
  }

  public signIn() {
    if (this.signInFormGroup.invalid) {
      return;
    }

    try {
      this.errorMessage = null;
      this.credentials = { ...this.signInFormGroup.value };
      console.log('> creds', this.credentials);
      this.store$.dispatch(new SecurityActions.LogIn(this.credentials));
      this.initializeForm();
    } catch (error) {
      console.error(error);
      this.errorMessage = error.message;
    }
  }

  initializeForm() {
    this.signInFormGroup = this.fb.group({
      identifier: [null, Validators.required],
      password: [null, Validators.required],
      provider: ['local', Validators.required]
    });
  }
}
