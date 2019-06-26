import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup
} from "@angular/forms";
import { Project, Story, System, Environment } from "../project-form";

@Component({
  selector: "app-project-form",
  templateUrl: "./project-form.component.html",
  styleUrls: ["./project-form.component.css"]
})
export class ProjectFormComponent implements OnInit {
  sysnames = [
    { id: 1, name: "iPlatform" },
    { id: 2, name: "Flexi" },
    { id: 3, name: "iAdmin" },
    { id: 4, name: "CIMS360" },
    { id: 5, name: "iPlatform Configurable" },
    { id: 6, name: "iGuide" },
    { id: 7, name: "Digital" },
    { id: 8, name: "Connect" },
    { id: 9, name: "QRater" },
    { id: 10, name: "Configuration" },
    { id: 99, name: "Other" }
  ];

  envnames = [
    { id: 1, name: "Production" },
    { id: 2, name: "UAT" },
    { id: 3, name: "Pre Production" },
    { id: 4, name: "Demo" },
    { id: 5, name: "Staging" }
  ];

  private _projectForm = new Project(
    0,
    "New Project",
    "Sprint N",
    "Generic",
    "<Lead Quality Assurer>",
    0,
    0,
    []
  );

  public get projectForm(): Project {
    return this._projectForm;
  }
  public set projectForm(value: Project) {
    this._projectForm = value;
  }

  public projectFormGroup: FormGroup;
  public submitted = false;
  public success = false;

  constructor(private fb: FormBuilder) {
    this.projectFormGroup = this.fb.group({
      name: [null, Validators.required],
      lead: [null, Validators.required],
      releaseName: [null, Validators.required],
      customerName: [null, Validators.required],
      totalStoryPoints: [null, Validators.required],
      totalStoryCount: [null, Validators.required],
      storyItems: [null, Validators.required]
    });
  }

  ngOnInit() {
    // this.doSomeWork();
  }

  onSubmit() {
    this.submitted = true;

    if (this.projectFormGroup.invalid) {
      return;
    }

    this.success = true;
    this.projectFormGroup.clearValidators();
  }

  doSomeWork() {
    if (typeof Worker !== "undefined") {
      // Create a new
      const worker = new Worker("../projects.worker", { type: "module" });
      worker.onmessage = ({ data }) => {
        console.log("page got message: ${data}");
      };
      worker.postMessage("hello");
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }
}
