import {
  LoadProject,
  Delete,
  Update,
  Add
} from '@states/project/project.actions';
import { fetchAllReleases } from '@states/project/project.selector';
import { AppStore } from '@models/store.interface';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { ReleaseSummary, Release } from '@models/project.interface';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent {
  public project: Release = {} as Release;
  public projects$: Observable<ReleaseSummary[]>;

  constructor(private store$: Store<AppStore>) {
    this.initialize();
  }

  initialize(): void {
    this.store$.dispatch(new LoadProject());
    this.projects$ = this.store$.select(fetchAllReleases);
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
