import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {
  Release
} from '@models/release.interface';
import { Person } from '@models/person.interface';
import { EnumsResponse } from '@models/enums.interface';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectFormComponent implements OnInit, OnChanges {
  @Input() project: Release = {} as Release;
  @Input() qaPeople: Person[] = [] as Person[];
  @Input() releaseOptions: EnumsResponse = {} as EnumsResponse;
  @Output() add: EventEmitter<Release> = new EventEmitter<Release>();
  @Output() update: EventEmitter<Release> = new EventEmitter<Release>();

  public projectFormGroup: FormGroup;
  public submitted = false;
  public success = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm(this.project);
  }

  ngOnChanges() {
    this.initForm(this.project);
  }

  public addProject() {
    const project: Release = { ...this.projectFormGroup.value };
    this.add.emit(project);
    this.initForm();
  }

  public updateProject() {
    const project = {
      ...this.project,
      ...this.projectFormGroup.value
    };
    this.update.emit(project);
    this.initForm();
  }

  private initForm(project: Partial<Release> = {}) {
    this.projectFormGroup = this.fb.group({
      id: [project.id],
      projectName: [project.projectName, Validators.required],
      releaseName: [project.releaseName, Validators.required],
      lead: [project.person, Validators.required],
      customerName: [project.customer, Validators.required],
      environment: [project.environment, Validators.required],
      status: [project.status, Validators.required],
      issues: [project.issues, Validators.required],
      system: [project.system, Validators.required],
      attachments: [project.attachments]
    });
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
    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker('../projects.worker', { type: 'module' });
      worker.onmessage = ({ data }) => {
        console.log('page got message: ${data}');
      };
      worker.postMessage('hello');
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }
}
