import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '@services/security.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentPath: string;
  hasToken$: Observable<boolean>;
  hasToken: boolean;
  @Input() title: string;
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    this.router.events.subscribe(
      (_: NavigationEnd) => (this.currentPath = _.url)
    );
    // this.hasToken$ = this.auth.hasTokenAsync();
    this.hasToken = false;
    this.auth.hasTokenAsync().subscribe(
      t => (this.hasToken = t),
      err => {
        this.hasToken = false;
        console.error(err);
      }
    );
  }
}
