import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonService, PersonQuery } from './person.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostComponent } from './host/host.component';
import { ProfileComponent } from './profile/profile.component';
import { PersonRoutingModule } from './person-routing.module';

@NgModule({
  declarations: [HostComponent, ProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PersonRoutingModule
  ],
  providers: [PersonService, PersonQuery]
})
export class PersonModule {}
