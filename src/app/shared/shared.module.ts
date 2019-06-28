import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { AuthService } from "./security.service";
import { CallbackComponent } from "./callback/callback.component";
import { LoadingComponent } from "./loading/loading.component";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CallbackComponent,
    LoadingComponent
  ],
  imports: [CommonModule, HttpClientModule, RouterModule],
  providers: [AuthService],
  exports: [HeaderComponent, FooterComponent]
})
export class SharedModule {}
