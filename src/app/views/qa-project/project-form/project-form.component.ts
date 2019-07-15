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
import { Project } from '@shared/interfaces/project.interface';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectFormComponent implements OnInit, OnChanges {
  @Input() project: Project = {} as Project;
  @Output() add: EventEmitter<Project> = new EventEmitter<Project>();
  @Output() update: EventEmitter<Project> = new EventEmitter<Project>();

  sysnames = [
    { id: 1, name: 'iPlatform' },
    { id: 2, name: 'Flexi' },
    { id: 3, name: 'iAdmin' },
    { id: 4, name: 'CIMS360' },
    { id: 5, name: 'iPlatform Configurable' },
    { id: 6, name: 'iGuide' },
    { id: 7, name: 'Digital' },
    { id: 8, name: 'Connect' },
    { id: 9, name: 'QRater' },
    { id: 10, name: 'Configuration' },
    { id: 99, name: 'Other' }
  ];

  envnames = [
    { id: 1, name: 'Production' },
    { id: 2, name: 'UAT' },
    { id: 3, name: 'Pre Production' },
    { id: 4, name: 'Demo' },
    { id: 5, name: 'Staging' }
  ];

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
    const project: Project = { ...this.projectFormGroup.value };
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

  private initForm(project: Partial<Project> = {}) {
    this.projectFormGroup = this.fb.group({
      name: [project.name, Validators.required],
      lead: [project.leadName, Validators.required],
      releaseName: [project.releaseName, Validators.required],
      customerName: [project.customerName, Validators.required],
      totalStoryPoints: [project.totalStoryPoints, Validators.required],
      totalStoryCount: [project.totalStoryCount, Validators.required],
      storyItems: [project.storyItems, Validators.required],
      system: [project.system, Validators.required],
      environment: [project.environment, Validators.required]
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
