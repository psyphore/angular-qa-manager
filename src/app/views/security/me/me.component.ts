import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService, StrapiAuthService } from '@services/security.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {
  public signInFormGroup: FormGroup;
  public errorMessage: string = null;
  public profile: Observable<any>;

  constructor(
    private router: Router,
    private service: StrapiAuthService,
    private authSvc: AuthService
  ) {}

  async ngOnInit() {
    this.errorMessage = null;
    try {
      if (this.authSvc.hasToken()) {
        this.profile = await this.service.me().pipe(map(res => res.me));
        return;
      }

      this.authSvc.removeSessionItem('id_token');
      this.router.navigate(['security/signin']);
    } catch (err) {
      console.error(err);
      this.errorMessage = err.message;
    }
  }
}
