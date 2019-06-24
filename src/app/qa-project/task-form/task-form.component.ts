import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProjectsService } from "./../projects.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Story } from "../project-form";

@Component({
  selector: "app-task-form",
  templateUrl: "./task-form.component.html",
  styleUrls: ["./task-form.component.css"]
})
export class TaskFormComponent implements OnInit {
  taskId: number;
  taskDetails: Story;
  taskFormGroup: FormGroup;
  constructor(
    private svc: ProjectsService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.route.params.subscribe(p => (this.taskId = p.id));

    this.taskFormGroup = this.fb.group({
      JIRA: ["", Validators.required],
      author: ["", Validators.required],
      status: ["", Validators.required],
      dateCompleted: ["", Validators.required],
      points: [0, Validators.required],
      attachments: [[], Validators.required]
    });
  }

  ngOnInit() {
    if (this.taskId !== 0) {
      this.svc
        .getProjectDetails(this.taskId)
        .subscribe((data: any) => (this.taskDetails.id = data.id));
    }
  }
}
