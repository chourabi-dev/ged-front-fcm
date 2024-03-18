import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { CheckboxModule } from '@app/shared/components/checkbox/checkbox.module';


@NgModule({
  declarations: [
    RolesComponent,
    ListComponent,
    NewComponent,
    EditComponent,
    
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    CheckboxModule
  ]
})
export class RolesModule { }
