import { Routes } from '@angular/router';

export const APP_LAYOUT_ROUTES: Routes = [
    //Dashboard
    { path: 'dashboard', loadChildren: () => import('../views/dashboard/dashboard.module').then(m => m.DashboardModule),  },
    
    { path: 'assigned-documents', loadChildren: () => import('../views/assigned-documents/assigned-documents.module').then(m => m.AssignedDocumentsModule) },
 

    { path: 'documents', loadChildren: () => import('../views/documents/documents.module').then(m => m.DocumentsModule) },

    { path: 'categories', loadChildren: () => import('../views/categories/categories.module').then(m => m.CategoriesModule) },

    { path: 'audit', loadChildren: () => import('../views/document-audit/document-audit.module').then(m => m.DocumentAuditModule) },
 

    { path: 'roles', loadChildren: () => import('../views/roles/roles.module').then(m => m.RolesModule) },
 
    { path: 'reminders', loadChildren: () => import('../views/reminders/reminders.module').then(m => m.RemindersModule) },
 
    { path: 'calendar', loadChildren: () => import('../views/calendar/calendar.module').then(m => m.CalendarModule) },
 

    { path: 'users', loadChildren: () => import('../views/users/users.module').then(m => m.UsersModule) },
 

    { path: 'team', loadChildren: () => import('../pages/team/team.module').then(m => m.TeamModule) },
 


    { path: 'login-audits', loadChildren: () => import('../views/login-audit/login-audit.module').then(m => m.LoginAuditModule) },
 
    { path: 'settings', loadChildren: () => import('../views/settings/settings.module').then(m => m.SettingsModule) },
 


 
    //Apps
    {
        path: 'apps',
        loadChildren: () => import('../views/apps/apps.module').then(m => m.AppsModule),
    },
    // UI Elements
    {
        path: 'ui-elements',
        loadChildren: () => import('../views/ui-elements/ui-elements.module').then(m => m.UiElementsModule),
    },
    // Icons 
    {
        path: 'icons',
        loadChildren: () => import('../views/icons/icons.module').then(m => m.IconsModule),
    },
    {
        path: 'maps',
        loadChildren: () => import('../views/maps/maps.module').then(m => m.MapsModule),
    },
    // Chart  
    {
        path: 'charts',
        loadChildren: () => import('../views/charts/charts.module').then(m => m.ChartsModule),
    },
    // Form Elements
    {
        path: 'form-elements',
        loadChildren: () => import('../views/form-elements/form-elements.module').then(m => m.FormElementsModule),
    },
    // Tables  
    {
        path: 'tables',
        loadChildren: () => import('../views/tables/tables.module').then(m => m.TablesModule),
    },
    // Pages  
    {
        path: 'pages',
        loadChildren: () => import('../views/pages/pages.module').then(m => m.PagesModule),
    },
    // Docs  
    {
        path: 'docs',
        loadChildren: () => import('../views/docs/docs.module').then(m => m.DocsModule),
    }
];