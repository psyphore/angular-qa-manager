import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { HostComponent } from "./host/host.component";
import { ProjectFormComponent } from "./project-form/project-form.component";
import { TaskFormComponent } from "./task-form/task-form.component";
import { ListingFormComponent } from "./listing-form/listing-form.component";
import { QaProjectRoutingModule } from "./qa-project-routing.module";

import { ProjectsService } from "./projects.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QaProjectRoutingModule
  ],
  declarations: [
    ProjectFormComponent,
    TaskFormComponent,
    ListingFormComponent,
    HostComponent
  ],
  providers: [ProjectsService]
})
export class QaProjectModule {}
