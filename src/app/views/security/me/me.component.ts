import { Component, OnInit } from '@angular/core';
import { AuthService, StrapiAuthService } from '@services/security.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {
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
      this.service.me().subscribe(
        res => console.log(res),
        error => console.error(error),
        () => console.log('done')
      );

      // if (this.authSvc.hasToken()) {
      //   this.service.me().subscribe(
      //     res => {
      //       this.profile = res.me;
      //     },
      //     error => {
      //       console.error(error);
      //       this.errorMessage = error;
      //       this.clearSessionStore();
      //     }
      //   );
      // }
    } catch (err) {
      console.error(err);
      this.errorMessage = err;
      this.clearSessionStore();
    }
  }

  private clearSessionStore(): void {
    this.authSvc.removeSessionItem('id_token');
    this.router.navigate(['security/signin']);
  }
}
