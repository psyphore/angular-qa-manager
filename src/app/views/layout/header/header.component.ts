import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '@services/security.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentPath: string;
  hasToken = false;
  @Input() title: string;
  constructor(private router: Router, private auth: AuthService) {
    this.router.events.subscribe(
      (_: NavigationEnd) => (this.currentPath = _.url)
    );
    this.hasToken = this.auth.hasToken();
  }

  ngOnInit() {
    this.hasToken = this.auth.hasToken();
  }
}
