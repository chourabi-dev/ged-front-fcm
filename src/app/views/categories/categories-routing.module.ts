import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { NewComponent } from './new/new.component';
import { SubsComponent } from './subs/subs.component';
import { AddSubComponent } from './add-sub/add-sub.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'new', component: NewComponent },
  { path: 'new/sub/parent/:id', component: AddSubComponent }, 
  { path: 'category/parent/:id', component: SubsComponent },
  
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
