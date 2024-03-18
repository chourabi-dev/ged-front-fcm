import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsComponent } from './documents.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { HistoryComponent } from './history/history.component';
import { AddComponent } from './add/add.component';
import { AddNewVersionComponent } from './add-new-version/add-new-version.component';
import { CommentsComponent } from './comments/comments.component';
import { SendEmailComponent } from './send-email/send-email.component';
import { ShareComponent } from './share/share.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'view/:id', component: ViewComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'add', component: AddComponent },
  { path: 'add-new-version/:id', component: AddNewVersionComponent },
  { path: 'history/:id', component: HistoryComponent },
  { path: 'comments/:id', component: CommentsComponent },
  { path: 'send-mail/:id', component: SendEmailComponent },
  { path: 'share/:id', component: ShareComponent }
  
  
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule { }
