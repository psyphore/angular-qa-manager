import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

const COMPONENTS = [FooterComponent, HeaderComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: [RouterModule, CommonModule],
  exports: COMPONENTS
})
export class LayoutModule {}
