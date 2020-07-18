import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { ProfileState } from './state';

@NgModule({
  declarations: [],
  imports: [CommonModule, NgxsModule.forFeature([ProfileState])]
})
export class MeStoreModule {}
