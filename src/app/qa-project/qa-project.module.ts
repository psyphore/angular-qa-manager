import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';

import { HostComponent } from './host/host.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { ListingFormComponent } from './listing-form/listing-form.component';
import { QaProjectRoutingModule } from './qa-project-routing.module';

import { ProjectsService } from './projects.service';
import { NewProjectComponent } from './dialogs/new-project/new-project.component';
import { DialogDataComponent } from './dialogs/new-project/dialog-data.component';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    QaProjectRoutingModule
  ],
  declarations: [
    ProjectFormComponent,
    TaskFormComponent,
    ListingFormComponent,
    HostComponent,
    NewProjectComponent,
    DialogDataComponent
  ],
  providers: [ProjectsService]
})
export class QaProjectModule {}
