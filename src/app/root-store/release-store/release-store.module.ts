import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { ReleaseState } from './release.state';

@NgModule({
  declarations: [],
  imports: [CommonModule, NgxsModule.forFeature([ReleaseState])]
})
export class ReleaseStoreModule { }
