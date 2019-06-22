import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectFormComponent } from './project-form/project-form.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { ListingFormComponent } from './listing-form/listing-form.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ProjectFormComponent, TaskFormComponent, ListingFormComponent]
})
export class QaProjectModule { }
