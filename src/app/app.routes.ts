import { Routes } from '@angular/router';
import { isAuthGuard } from './core/guards/is-auth.guard';


export const routes: Routes = [

    {path : 'auth' , loadComponent : () =>  
    import('./features/auth/pages/auth.component').then(c => c.AuthComponent),
    loadChildren : () => import('./features/auth/auth.routes').then((r) => r.authRoutes),
    data: { preload: true }
    },

    {path : '' , canMatch : [isAuthGuard] , loadComponent : () =>  
    import('./main/main.component').then(c => c.MainComponent),
    loadChildren : () => import('./main/main.routes').then((r) => r.mainRoutes),
    data: { preload: true }
    },

];
