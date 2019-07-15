import { TaskListingComponent } from './task-listing/task-listing.component';
import { TaskComponent } from './task/task.component';
import { ProjectComponent } from './project/project.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostComponent } from './host/host.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { ListingFormComponent } from './listing-form/listing-form.component';
import { QaProjectRoutingModule } from './qa-project-routing.module';

import { NewProjectComponent } from './dialogs/new-project/new-project.component';
import { DialogDataComponent } from './dialogs/new-project/dialog-data.component';

import { SharedMaterialModule } from '@shared/shared-material.module';
import { SharedModule } from '@shared/shared.module';

const COMPONENTS = [
  ProjectFormComponent,
  TaskFormComponent,
  ListingFormComponent,
  HostComponent,
  NewProjectComponent,
  DialogDataComponent,
  ProjectComponent,
  TaskComponent,
  TaskListingComponent
];

@NgModule({
  imports: [
    CommonModule,
    QaProjectRoutingModule,
    SharedMaterialModule,
    SharedModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class QaProjectModule {}
