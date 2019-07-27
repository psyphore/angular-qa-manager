import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HostComponent } from './host/host.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { ListingFormComponent } from './listing-form/listing-form.component';
import { AuthGuard } from '@shared/guards/auth.guard';
import { ProjectComponent } from './project/project.component';

const routes: Routes = [
  {
    path: 'projects',
    component: HostComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ProjectComponent },
      { path: 'list/:archived', component: ListingFormComponent },
      { path: 'detail/:projectId', component: ProjectComponent },
      { path: 'detail/:projectId/task/:taskId', component: TaskFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QaProjectRoutingModule {}
