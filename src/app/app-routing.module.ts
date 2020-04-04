import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LandingComponent } from '@views/landing/landing.component';
import { CallbackComponent } from '@views/callback/callback.component';
import { environment } from '@environments/environment';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'callback', component: CallbackComponent },
  { path: '**', redirectTo: 'security/signin' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: environment.production,
      useHash: true,
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
