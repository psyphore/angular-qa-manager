import { Store, Select } from '@ngxs/store';

import { Observable } from 'rxjs';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Person } from '@models/person.interface';
import { Release } from '@models/release.interface';
import { EnumsResponse } from '@models/enums.interface';
import { OptionsState } from '@root-store/options-store/state';
import { ProjectState } from '@root-store/release-store/state';
import { ReleaseItem, ReleaseItems } from '@root-store/release-store/actions';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent implements OnInit {
  @Select(ProjectState.getProject) project$: Observable<Release>;
  @Select(ProjectState.getProjects) projects$: Observable<Release[]>;
  @Select(ProjectState.getErrors) errorMessage$: Observable<string>;
  @Select(ProjectState.isLoading) isLoading$: Observable<boolean>;
  qaPeople$: Observable<Person[]>;
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

  public onAdd(project: Release) {
    this.store$.dispatch(new ReleaseItem(+project.id));
  }

  public onUpdate(project: Release) {
    this.store$.dispatch(new ReleaseItem(+project.id));
  }

  public onDelete(project: Release) {
    this.store$.dispatch(new ReleaseItem(+project.id));
  }
}
