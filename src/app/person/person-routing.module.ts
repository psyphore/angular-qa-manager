import { AuthGuard } from "./../shared/auth.guard";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ProfileComponent } from "./profile/profile.component";
import { HostComponent } from "./host/host.component";

const routes: Routes = [
  {
    path: "me",
    component: HostComponent,
    canActivate: [AuthGuard],
    children: [{ path: "", component: ProfileComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonRoutingModule {}
