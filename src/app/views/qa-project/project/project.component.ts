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
import { first, flatMap, map } from 'rxjs/operators';
import { EnumsResponse } from '@models/enums.interface';
import { ProjectsService } from '@services/projects.service';
import { GeneralServices, PersonService } from '@shared/services';

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

  constructor(
    private store$: Store<RootStoreState.RootState>,
    private options$: GeneralServices,
    private project$: ProjectsService,
    private people$: PersonService
  ) {}

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

    this.project$.getReleaseListing(10, 0).pipe(
      map(payload => {
        this.projects$ = new Observable(s => s.next(payload.releases));
        this.qaPeople$ = new Observable(s => s.next(payload.people));
        this.projectOptions$ = new Observable(s =>
          s.next(<EnumsResponse>{
            statuses: payload.statuses,
            environments: payload.environments,
            systems: payload.systems
          })
        );
      })
    );

    // this.projectOptions$ = this.options$.getAllOptions();
    // this.projects$ = this.project$
    //   .getAllReleases(900, 0)
    //   .pipe(map(value => value.releases));
    // this.qaPeople$ = this.people$.getUsers();
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
