import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { IssueState } from './issue.state';

@NgModule({
  declarations: [],
  imports: [CommonModule, NgxsModule.forFeature([IssueState])]
})
export class IssueStoreModule { }
