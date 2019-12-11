import * as ProjectActions from '@states/project/project.actions';
import * as ProjectSelectors from '@states/project/project.selector';
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
    this.store$.dispatch(new ProjectActions.LoadProject());
    this.projects$ = this.store$.select(ProjectSelectors.selectAll);
  }

  public onDelete(project: Project) {
    this.store$.dispatch(new ProjectActions.Delete(project.id));
  }
  public onSelect(project: Project) {
    this.project = project;
  }

  public onUpdate(project: Project) {
    this.store$.dispatch(new ProjectActions.Update(project));
  }
  public onAdd(project: Project) {
    this.store$.dispatch(new ProjectActions.Add(project));
  }
}
