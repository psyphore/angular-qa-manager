import { Component, OnInit } from '@angular/core';
import { AuthService, StrapiAuthService } from '@services/security.service';
import { Router } from '@angular/router';
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
    private service: StrapiAuthService,
    private authSvc: AuthService
  ) {}

  ngOnInit() {
    this.errorMessage = null;
    try {
      if (this.authSvc.hasToken()) {
        this.service.me().subscribe(
          res => (this.profile = res),
          error => this.handleError(error)
        );
      }
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
