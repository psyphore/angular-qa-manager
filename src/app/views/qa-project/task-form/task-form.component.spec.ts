import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';

import { TaskFormComponent } from './task-form.component';
import { Issue } from '../../../shared/interfaces';
import { SharedMaterialModule } from '../../../shared/shared-material.module';
import { SharedModule } from '../../../shared/shared.module';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule, SharedMaterialModule, SharedModule],
      declarations: [TaskFormComponent],
      providers: [
        FormBuilder
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;

    component.task = <Issue>{
      id: 1,
      summary: 'Task 1',
      description: 'This is a test task',
      status: 'QA Ready',
      points: 1,
      person: 'Lead QA',
      link: 'www.link.com'
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
