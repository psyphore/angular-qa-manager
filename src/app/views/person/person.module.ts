import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostComponent } from './host/host.component';
import { ProfileComponent } from './profile/profile.component';
import { PersonRoutingModule } from './person-routing.module';
import { SharedMaterialModule } from '@shared/shared-material.module';
import { SharedModule } from '@shared/shared.module';

const COMPONENTS = [HostComponent, ProfileComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    PersonRoutingModule,
    SharedMaterialModule,
    SharedModule
  ],
  exports: COMPONENTS
})
export class PersonModule {}
