import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginAuditRoutingModule } from './login-audit-routing.module';
import { LoginAuditComponent } from './login-audit.component';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    LoginAuditComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    LoginAuditRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule
  ]
})
export class LoginAuditModule { }
