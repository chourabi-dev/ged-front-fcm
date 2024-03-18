import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Select } from '@ngxs/store';
import { AppConfig } from '@app/shared/types/app-config.interface';
import { Observable, Subscription } from 'rxjs';
import { en_US } from './i18n/en/index'
import { fr_FR } from './i18n/fr/index'

import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFirestore } from '@angular/fire/firestore';
import { ApiService } from './api.service';

const storageKey = 'lang'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
    @Select((state: { app: AppConfig; }) => state.app) app$: Observable<AppConfig>;
    private langChangeSubscription!: Subscription;
    currentLang: string;

    constructor(private api:ApiService, private translateService: TranslateService,private messaging:AngularFireMessaging, private db:AngularFirestore) {
        translateService.setTranslation('en_US', en_US);
        translateService.setTranslation('fr_FR', fr_FR);
    }


    getToken(){
        this.messaging.getToken.subscribe((res)=>{
            console.log(res);

            this.api.updateFCM(res).toPromise().then((res)=>{
                console.log(res);
                
            })
            
        },(err)=>{
            console.log(err);
            
        })
    }

    ngOnInit() {
        this.getToken();

        this.app$.subscribe(app => {
            this.currentLang = localStorage.getItem(storageKey) || app.lang || this.translateService.getBrowserCultureLang();
            this.translateService.use(this.currentLang);
        });
        this.langChangeSubscription = this.translateService.onLangChange.subscribe((event: LangChangeEvent) => { 
            localStorage.setItem(storageKey, event.lang); 
        });
    }

    ngOnDestroy() {
        if (this.langChangeSubscription) {
            this.langChangeSubscription.unsubscribe();
        }
    }

}
