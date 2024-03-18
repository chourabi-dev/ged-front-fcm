import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { LanguagesComponent } from './languages/languages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { AddLanguagesComponent } from './add-languages/add-languages.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { SmtpComponent } from './smtp/smtp.component';
import { AddSmtpComponent } from './add-smtp/add-smtp.component';
import { SwitchModule } from '@app/shared/components/switch/switch.module';
import { EditSmtpComponent } from './edit-smtp/edit-smtp.component';


@NgModule({
  declarations: [
    SettingsComponent,
    LanguagesComponent,
    AddLanguagesComponent,
    CompanyProfileComponent,
    SmtpComponent,
    AddSmtpComponent,
    EditSmtpComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule ,
    SwitchModule
  ]
})
export class SettingsModule { }
