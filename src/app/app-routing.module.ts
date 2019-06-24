import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { LandingComponent } from "./landing/landing.component";

const routes: Routes = [
  { path: "", component: LandingComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
