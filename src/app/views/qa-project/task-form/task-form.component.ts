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
import { Issue } from '@models/issue.interface';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFormComponent implements OnInit, OnChanges {
  @Input() task: Issue = {} as Issue;
  @Output() add: EventEmitter<Issue> = new EventEmitter<Issue>();
  @Output() update: EventEmitter<Issue> = new EventEmitter<Issue>();

  taskId: number;
  taskDetails: Issue;
  taskFormGroup: FormGroup;

  status = [
    { id: 1, name: 'To Do' },
    { id: 2, name: 'In Progress' },
    { id: 3, name: 'QA Ready' },
    { id: 4, name: 'QA In Progress' },
    { id: 5, name: 'Passed' },
    { id: 6, name: 'Failed' }
  ];

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    this.route.params.subscribe(p => (this.taskId = p.id));
  }

  ngOnInit() {
    this.initForm(this.task);
  }

  ngOnChanges() {
    this.initForm(this.task);
  }

  public addTask() {
    const task: Issue = { ...this.taskFormGroup.value };
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

  initForm(task: Partial<Issue> = {}) {
    this.taskFormGroup = this.fb.group({
      link: [task.link, Validators.required],
      person: [task.person, Validators.required],
      status: [
        task.status,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(5)
        ])
      ],
      description: [task.description, Validators.required],
      points: [task.points, Validators.required],
      attachments: [
        null,
        Validators.compose([Validators.required, Validators.minLength(1)])
      ]
    });
  }
}
