import { Component, OnInit, Input } from '@angular/core';
import { environment } from '@environments/environment';
// import { faCode } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  // faCode = faCode;
  @Input() title: string = environment.appName;
  constructor() {}

  ngOnInit() {}
}
