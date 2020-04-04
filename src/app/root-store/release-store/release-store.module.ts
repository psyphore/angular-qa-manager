import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { ProjectState } from './state';

@NgModule({
  declarations: [],
  imports: [CommonModule, NgxsModule.forFeature([ProjectState])]
})
export class ReleaseStoreModule {}
