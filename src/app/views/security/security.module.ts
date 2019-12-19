import { MeComponent } from './me/me.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostComponent } from './host/host.component';

import { SecurityRoutingModule } from './security-routing.module';
import { SigninComponent } from './signin/signin.component';

import { SharedMaterialModule } from '@shared/shared-material.module';
import { SharedModule } from '@shared/shared.module';

import { PersonModule } from './../person/person.module';

const COMPONENTS = [HostComponent, SigninComponent, MeComponent];

@NgModule({
  imports: [
    CommonModule,
    SecurityRoutingModule,
    SharedMaterialModule,
    SharedModule,
    PersonModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class SecurityModule {}
