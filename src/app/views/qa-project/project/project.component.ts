import { Store, Select } from '@ngxs/store';

import { Observable } from 'rxjs';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Person } from '@models/person.interface';
import { Release, MutateRelease } from '@models/release.interface';
import { EnumsResponse } from '@models/enums.interface';
import { OptionsState } from '@root-store/options-store/state';
import { PeopleState } from '@root-store/people-store/state';
import { ReleaseItems, ReleaseItem, ReleaseItemAdd, ReleaseUpdateItem, ReleaseDeleteItem } from '@root-store/release-store/release.actions';
import { ReleaseState } from '@root-store/release-store/release.state';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent implements OnInit {
  @Select(ReleaseState.getProject) project$: Observable<Release>;
  @Select(ReleaseState.getProjects) projects$: Observable<Release[]>;
  @Select(ReleaseState.getErrors) errorMessage$: Observable<string>;
  @Select(ReleaseState.isLoading) isLoading$: Observable<boolean>;
  @Select(PeopleState.getPeople) qaPeople$: Observable<Person[]>;
  @Select(OptionsState.getOptions) projectOptions$: Observable<EnumsResponse>;

  constructor(private store$: Store) { }

  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {
    this.store$.dispatch(new ReleaseItems());
  }

  public onSelect(project: Release) {
    this.store$.dispatch(new ReleaseItem(+project.id));
  }

  public onAdd(project: MutateRelease) {
    console.log({ project });
    this.store$.dispatch(new ReleaseItemAdd(project));
  }

  public onUpdate(project: Release) {
    this.store$.dispatch(new ReleaseUpdateItem(project));
  }

  public onDelete(project: Release) {
    this.store$.dispatch(new ReleaseDeleteItem(project));
  }
}
