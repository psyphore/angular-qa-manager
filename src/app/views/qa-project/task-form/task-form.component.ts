import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Story } from '@models/project.interface';
import { ProjectsService } from '@services/projects.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFormComponent implements OnInit, OnChanges {
  @Input() task: Story = {} as Story;
  @Output() add: EventEmitter<Story> = new EventEmitter<Story>();
  @Output() update: EventEmitter<Story> = new EventEmitter<Story>();

  taskId: number;
  taskDetails: Story;
  taskFormGroup: FormGroup;

  status = [
    { id: 1, name: 'To Do' },
    { id: 2, name: 'In Progress' },
    { id: 3, name: 'QA Ready' },
    { id: 4, name: 'QA In Progress' },
    { id: 5, name: 'Passed' },
    { id: 6, name: 'Failed' }
  ];

  constructor(
    private svc: ProjectsService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.route.params.subscribe(p => (this.taskId = p.id));
  }

  ngOnInit() {
    this.initForm(this.task);
    if (this.taskId !== 0) {
      this.svc
        .getProject(this.taskId)
        .subscribe((data: any) => (this.taskDetails.id = data.id));
    }
  }

  ngOnChanges() {
    this.initForm(this.task);
  }

  public addTask() {
    const task: Story = { ...this.taskFormGroup.value };
    this.add.emit(task);
    this.initForm();
  }

  public updateTask() {
    const task = {
      ...this.task,
      ...this.taskFormGroup.value
    };
    this.update.emit(task);
    this.initForm();
  }

  initForm(task: Partial<Story> = {}) {
    this.taskFormGroup = this.fb.group({
      JIRA: [task.JIRA, Validators.required],
      author: [task.developer, Validators.required],
      status: [
        task.status,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(5)
        ])
      ],
      dateCompleted: [task.dateCompleted, Validators.required],
      points: [task.points, Validators.required],
      attachments: [
        null,
        Validators.compose([Validators.required, Validators.minLength(1)])
      ]
    });
  }
}
