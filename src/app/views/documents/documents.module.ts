import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentsComponent } from './documents.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from '@app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TranslateModule } from '@ngx-translate/core';
import { ViewComponent } from './view/view.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { EditComponent } from './edit/edit.component';
import { HistoryComponent } from './history/history.component';
import { AddComponent } from './add/add.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CheckboxModule } from '@app/shared/components/checkbox/checkbox.module';
import { AddNewVersionComponent } from './add-new-version/add-new-version.component';
import { CommentsComponent } from './comments/comments.component';
import { SendEmailComponent } from './send-email/send-email.component';
import { ShareComponent } from './share/share.component';


@NgModule({
  declarations: [
    DocumentsComponent,
    ListComponent,
    ViewComponent,
    EditComponent,
    HistoryComponent,
    AddComponent,
    AddNewVersionComponent,
    CommentsComponent,
    SendEmailComponent,
    ShareComponent
  ],
  imports: [
    CommonModule,
    DocumentsRoutingModule, 
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule,
    TranslateModule,
    NgxDocViewerModule,
    NgSelectModule,
    CheckboxModule
  ]
})
export class DocumentsModule { }
