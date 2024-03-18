import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignedDocumentsRoutingModule } from './assigned-documents-routing.module';
import { AssignedDocumentsComponent } from './assigned-documents.component';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


@NgModule({
  declarations: [
    AssignedDocumentsComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    AssignedDocumentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule,
    BsDropdownModule
  ]
})
export class AssignedDocumentsModule { }
