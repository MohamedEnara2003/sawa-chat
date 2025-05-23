import { Routes } from '@angular/router';

export const authRoutes: Routes = [
    {path : 'sign-in'  , data: { hideLayout: true } , loadComponent : () => 
    import('./pages/sign-in/sign-in.component').then(c => c.SignInComponent)
    },
    {path : 'sign-up' , data: { hideLayout: true } , loadComponent : () => 
    import('./pages/sign-up/sign-up.component').then(c => c.SignUpComponent)
    },
    {path : 'call-back' , data: { hideLayout: true } , loadComponent : () => 
    import('./pages/auth-call-back/auth-call-back.component').then(c => c.AuthCallBackComponent)
    },
    {path : '' , redirectTo : '/auth/sign-up' , pathMatch : 'full'}
];
