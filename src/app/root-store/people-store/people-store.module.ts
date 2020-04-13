import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { PeopleState } from './state';

@NgModule({
  declarations: [],
  imports: [CommonModule, NgxsModule.forFeature([PeopleState])]
})
export class PeopleStoreModule { }
