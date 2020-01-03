import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import {
  LoadProject,
  LoadOptions,
  Delete,
  Update,
  Add
} from '@states/project/project.actions';
import { selectAll as selectProjects } from '@states/project/project.selector';
import { selectAll as selectOptions } from '@states/project/enum.selector';

import { LoadPeople } from '@states/person/person.actions';
import { selectAll as selectPeople } from '@states/person/person.selector';

import { AppStore } from '@models/store.interface';
import { Person } from '@models/person.interface';
import { EnumsReponse } from '@models/enums.interface';
import { Release } from '@models/project.interface';
import { first, flatMap } from 'rxjs/operators';

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
  public projectOptions$: Observable<EnumsReponse>;

  constructor(private store$: Store<AppStore>) {}

  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {
    this.store$.dispatch(new LoadOptions());
    this.store$.dispatch(new LoadProject());
    this.store$.dispatch(new LoadPeople());

    this.projects$ = this.store$.select(selectProjects);
    this.qaPeople$ = this.store$.select(selectPeople);
    this.projectOptions$ = this.store$.select(selectOptions).pipe(
      first(),
      flatMap(p => p)
    );
  }

  public onDelete(project: Release) {
    this.store$.dispatch(new Delete(project));
  }

  public onSelect(project: Release) {
    this.project = project;
  }

  public onUpdate(project: Release) {
    this.store$.dispatch(new Update(project));
  }

  public onAdd(project: Release) {
    this.store$.dispatch(new Add(project));
  }
}
