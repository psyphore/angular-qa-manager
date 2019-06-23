import { ProjectsService } from "./../projects.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-task-form",
  templateUrl: "./task-form.component.html",
  styleUrls: ["./task-form.component.css"]
})
export class TaskFormComponent implements OnInit {
  taskId: number;
  taskDetails: Object;
  constructor(private svc: ProjectsService, private route: ActivatedRoute) {
    this.route.params.subscribe(p => (this.taskId = p.id));
  }

  ngOnInit() {
    if (this.taskId !== 0) {
      this.svc
        .getProjectDetails(this.taskId)
        .subscribe(data => (this.taskDetails = data));
    }
  }
}
