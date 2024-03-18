import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { ListComponent } from './list/list.component';
import { TranslateModule } from '@ngx-translate/core';
import { EditComponent } from './edit/edit.component';
import { NewComponent } from './new/new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubsComponent } from './subs/subs.component';
import { AddSubComponent } from './add-sub/add-sub.component';


@NgModule({
  declarations: [
    CategoriesComponent,
    ListComponent,
    EditComponent,
    NewComponent,
    SubsComponent,
    AddSubComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CategoriesModule { }
