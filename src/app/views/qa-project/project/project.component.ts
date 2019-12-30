import {
  LoadProject,
  Delete,
  Update,
  Add
} from '@states/project/project.actions';
import { selectAll } from '@states/project/project.selector';
import { AppStore } from '@models/store.interface';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { Project } from '@models/project.interface';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent {
  public project: Project = {} as Project;
  public projects$: Observable<any>;

  constructor(private store$: Store<AppStore>) {
    this.initialize();
  }

  initialize(): void {
    this.store$.dispatch(new LoadProject());
    this.projects$ = this.store$.select(selectAll);
  }

  public onDelete(project: Project) {
    this.store$.dispatch(new Delete(project.id));
  }
  public onSelect(project: Project) {
    this.project = project;
  }

  public onUpdate(project: Project) {
    this.store$.dispatch(new Update(project));
  }
  public onAdd(project: Project) {
    this.store$.dispatch(new Add(project));
  }
}
