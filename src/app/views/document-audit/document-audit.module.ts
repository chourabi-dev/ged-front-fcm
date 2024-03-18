import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentAuditRoutingModule } from './document-audit-routing.module';
import { DocumentAuditComponent } from './document-audit.component';
import { ListComponent } from './list/list.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DocumentAuditComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    DocumentAuditRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DocumentAuditModule { }
