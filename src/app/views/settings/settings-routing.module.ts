import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { LanguagesComponent } from './languages/languages.component';
import { AddLanguagesComponent } from './add-languages/add-languages.component'; 
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { SmtpComponent } from './smtp/smtp.component';
import { AddSmtpComponent } from './add-smtp/add-smtp.component';
import { EditSmtpComponent } from './edit-smtp/edit-smtp.component';

const routes: Routes = [
  { path: 'languages', component: LanguagesComponent },
  { path: 'add-languages', component: AddLanguagesComponent },
  { path: 'company-profile', component: CompanyProfileComponent },
  { path: 'smtp', component: SmtpComponent },
  { path: 'smtp/add', component: AddSmtpComponent },
  { path: 'smtp/edit/:id', component: EditSmtpComponent },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
