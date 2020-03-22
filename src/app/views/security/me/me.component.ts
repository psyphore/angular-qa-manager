import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { ProfileState } from '@root-store/me-store/state';
import { LoadProfile } from '@root-store/me-store/actions';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {
  @Select(ProfileState.getProfile) profile$;
  @Select(ProfileState.getErrors) errorMessage$;
  @Select(ProfileState.isLoading) isLoading$;

  constructor(private store$: Store) {}

  ngOnInit() {
    this.store$.dispatch(LoadProfile);
  }
}
