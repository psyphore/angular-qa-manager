import { SecurityService } from "./security.service";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./layout/header/header.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, HttpClientModule],
  providers: [SecurityService]
})
export class SharedModule {}
