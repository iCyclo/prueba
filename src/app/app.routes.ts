import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '',
    redirectTo: 'form',
    pathMatch: 'full'
    },
    {
        path: 'form',
        loadComponent: () => import('./pages/form/form.component').then(m => m.FormComponent)
    },
    {
        path: 'success',
        loadComponent: () => import('./pages/success/success.component').then(m => m.SuccessComponent)
    },
    {
        path: 'nasa',
        loadComponent: () => import('./pages/nasa/nasa.component').then(m => m.NasaComponent)
    }
];
