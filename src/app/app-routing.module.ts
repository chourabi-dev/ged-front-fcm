import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { AuthLayoutComponent } from "./layout/auth-layout/auth-layout.component";
import { AppLayoutComponent } from "./layout/app-layout/app-layout-component";

import { AUTH_LAYOUT_ROUTES } from "./routes/auth-layout.routes";
import { APP_LAYOUT_ROUTES } from './routes/app-layout.routes';
import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [
 

    { path:'', redirectTo:'/', pathMatch:'full' },
    { 
        path: '', 
        component: AppLayoutComponent,
        children: APP_LAYOUT_ROUTES,
        canActivate:[AuthGuard]
    },  
    
    
    { 
        path: 'auth', 
        component: AuthLayoutComponent, 
        children: AUTH_LAYOUT_ROUTES
    },
 

    

    

    

    




   

 
    
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {
            preloadingStrategy: PreloadAllModules,
            anchorScrolling: 'enabled',
            scrollPositionRestoration: 'enabled',
            relativeLinkResolution: 'legacy'
        })
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {
}