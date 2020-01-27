import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import {
  RootStoreState,
  SignInStoreActions,
  SignInStoreSelectors
} from '../../../root-store/';

import { Person } from '@models/person.interface';
import { Release } from '@models/release.interface';
import { first, flatMap } from 'rxjs/operators';
import { EnumsResponse } from '@models/enums.interface';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent implements OnInit {
  public project: Release = {} as Release;
  public projects$: Observable<Release[]>;
  public qaPeople$: Observable<Person[]>;
  public projectOptions$: Observable<EnumsResponse>;

  constructor(private store$: Store<RootStoreState.RootState>) {}

  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {
    // this.store$.dispatch(LoadOptions());
    // this.store$.dispatch(LoadRelease({limit: 900, start: 0}));
    // this.store$.dispatch(new LoadPeople());
    // this.projects$ = this.store$.select(selectProjects);
    // this.qaPeople$ = this.store$.select(selectPeople);
    // this.projectOptions$ = this.store$.pipe(select(selectOptions).pipe(
    //   first(),
    //   flatMap(p => p)
    // );
  }

  public onDelete(project: Release) {
    // this.store$.dispatch(DeleteRelease(project));
  }

  public onSelect(project: Release) {
    this.project = project;
  }

  public onUpdate(project: Release) {
    // this.store$.dispatch(UpdateRelease(project));
  }

  public onAdd(project: Release) {
    // this.store$.dispatch(AddRelease(project));
  }
}
