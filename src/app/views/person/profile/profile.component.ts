import { PersonService, PersonQuery } from '@services/person.service';
import { AuthService } from '@services/security.service';
import { Person } from '@models/person.interface';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: Person;
  profileJson: string;

  constructor(
    private authService: AuthService,
    private personService: PersonService,
    private personQuery: PersonQuery
  ) {}

  ngOnInit() {
    this.dummyProfileGraphQL();
  }

  private dummyProfile() {
    this.personService.getUser(1).subscribe(profile => {
      if (profile) {
        this.profile = profile;
        this.profileJson = JSON.stringify(this.profile, null, 2);
      }
      this.profile = null;
      this.profileJson = null;
    });
  }

  private dummyProfileGraphQL() {
    this.personQuery
      .watch()
      .valueChanges.pipe(map(result => result.data))
      .subscribe((data: Person) => (this.profile = data));
  }

  private fetchProfile() {
    this.authService.profile.subscribe(profile => {
      if (profile) {
        this.profile = profile;
        this.profileJson = JSON.stringify(this.profile, null, 2);
        return;
      }
      this.profile = null;
      this.profileJson = null;
    });
  }

  private invokeWorker() {
    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker('../person.worker', { type: 'module' });
      worker.onmessage = ({ data }) => {
        console.log(`page got message: ${data}`);
      };
      worker.postMessage('hello');
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }
}
