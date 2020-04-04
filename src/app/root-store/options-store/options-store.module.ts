import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { OptionsState } from './state';

@NgModule({
  declarations: [],
  imports: [CommonModule, NgxsModule.forFeature([OptionsState])]
})
export class OptionsStoreModule {}
