import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
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
  public profile: any;

  constructor(
    private router: Router,
    private service: StrapiAuthService,
    private authSvc: AuthService
  ) {}

  ngOnInit() {
    this.errorMessage = null;
    try {
      if (this.authSvc.hasToken()) {
        this.service.me().subscribe(
          res => {
            this.profile = res.me;
          },
          error => {
            console.error(error);
            this.errorMessage = error;
            this.authSvc.removeSessionItem('id_token');
            this.router.navigate(['security/signin']);
          }
        );
      }
    } catch (err) {
      console.error(err);
      this.errorMessage = err;
      this.authSvc.removeSessionItem('id_token');
      this.router.navigate(['security/signin']);
    }
  }
}
