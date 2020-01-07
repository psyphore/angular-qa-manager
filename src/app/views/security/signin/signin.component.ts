import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { LogIn, LogOut } from '@states/security/security.actions';
import { AppStore } from '@models/store.interface';
import { SignInCredentials } from '@models/security.interface';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninComponent implements OnInit {
  public signInFormGroup: FormGroup;
  public errorMessage: string = null;

  constructor(private fb: FormBuilder, private store$: Store<AppStore>) {}

  ngOnInit() {
    // this.store$.dispatch(LogOut());
    this.initializeForm();
  }

  public signIn() {
    if (this.signInFormGroup.invalid) {
      return;
    }

    try {
      this.errorMessage = null;
      const values = { creds: { ...this.signInFormGroup.value } };
      this.store$.dispatch(LogIn({ payload: values }));
      this.initializeForm();
    } catch (error) {
      this.errorMessage = error.message;
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
