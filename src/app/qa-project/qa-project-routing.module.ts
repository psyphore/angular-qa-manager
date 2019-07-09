import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HostComponent } from './host/host.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { ListingFormComponent } from './listing-form/listing-form.component';
import { AuthGuard } from '../shared/auth.guard';

const routes: Routes = [
  {
    path: 'projects',
    component: HostComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: '', component: ListingFormComponent },
      { path: 'archived', component: ListingFormComponent },
      { path: 'detail/:projectId', component: ProjectFormComponent },
      { path: 'detail/:projectId/task/:taskId', component: TaskFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QaProjectRoutingModule {}
