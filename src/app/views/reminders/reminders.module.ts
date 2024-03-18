import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemindersRoutingModule } from './reminders-routing.module';
import { RemindersComponent } from './reminders.component';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { FrequencyPipe } from './frequency.pipe';
import { AddComponent } from './add/add.component';
import { CheckboxModule } from '@app/shared/components/checkbox/checkbox.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { EditComponent } from './edit/edit.component';
 

@NgModule({
  declarations: [
    RemindersComponent,
    ListComponent,
    FrequencyPipe,
    AddComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    RemindersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    HttpClientModule,
    CheckboxModule,
    NgSelectModule
  ]
})
export class RemindersModule { }
