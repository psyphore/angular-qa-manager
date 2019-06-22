import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { ProjectFormComponent } from "./project-form/project-form.component";
import { TaskFormComponent } from "./task-form/task-form.component";
import { ListingFormComponent } from "./listing-form/listing-form.component";
import { ProjectsService } from "./projects.service";

const projectRoutes = [
  { path: "projects", component: ListingFormComponent },
  { path: "projects/task/:taskId", component: TaskFormComponent },
  { path: "projects/project/:projectId", component: ProjectFormComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(projectRoutes)
  ],
  declarations: [ProjectFormComponent, TaskFormComponent, ListingFormComponent],
  providers: [ProjectsService]
})
export class QaProjectModule {}
