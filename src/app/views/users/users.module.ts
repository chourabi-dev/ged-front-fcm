import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { EditComponent } from './edit/edit.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { EditPermessionsComponent } from './edit-permessions/edit-permessions.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
  declarations: [
    UsersComponent,
    ListComponent,
    NewComponent,
    EditComponent,
    EditPermessionsComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDropdownModule,
    NgSelectModule
  ]
})
export class UsersModule { }
