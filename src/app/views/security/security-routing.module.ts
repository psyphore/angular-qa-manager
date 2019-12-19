import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '@shared/guards/auth.guard';

import { HostComponent } from './host/host.component';
import { SigninComponent } from './signin/signin.component';
import { MeComponent } from './me/me.component';

const routes: Routes = [
  {
    path: 'security',
    component: HostComponent,
    children: [
      { path: 'signin', component: SigninComponent },
      { path: 'me', component: MeComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule {}
