import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { SignInState } from './state';

@NgModule({
  declarations: [],
  imports: [CommonModule, NgxsModule.forFeature([SignInState])]
})
export class SignInStoreModule {}
