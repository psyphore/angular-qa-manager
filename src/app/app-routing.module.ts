import { LandingComponent } from './shared/landing/landing.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CallbackComponent } from './shared/callback/callback.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'callback', component: CallbackComponent }
  // { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
