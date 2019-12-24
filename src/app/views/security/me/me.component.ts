import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService, StrapiAuthService, StrapiMeService } from '@shared/services';
import { SignInCredentials } from '@shared/interfaces/security.interface';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {
  public signInFormGroup: FormGroup;
  public errorMessage: string = null;
  public profile: Observable<any>;

  constructor(private meSvc: StrapiMeService, private authSvc: AuthService) { }

  async ngOnInit() {
    this.errorMessage = null;
    try{
      if(this.authSvc.hasToken()) {

      }
      this.profile = await this.meSvc.watch(null, {
        fetchPolicy: 'network-only'
      })
      .valueChanges
      .pipe(
        map(result => result.data.me)
      );

    }catch(err) {
      console.error(err);
      this.errorMessage = err.message;
    }

  }

}
