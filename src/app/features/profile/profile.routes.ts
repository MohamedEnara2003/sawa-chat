import { Routes } from "@angular/router";

export const profileRoutes: Routes = [
    {path : 'activity' , loadComponent : () => 
    import('./pages/profile-activity/profile-activity.component').then((c) => c.ProfileActivityComponent)
    },
    {path : 'notification' , loadComponent : () => 
    import('./pages/profile-notification/profile-notification.component')
    .then((c) => c.ProfileNotificationComponent)
    },
    {path : 'display' , loadComponent : () =>
    import('./pages/profile-display/profile-display.component').then((c) => c.ProfileDisplayComponent)
    },
    {path : '' , redirectTo : '/profile/activity' , pathMatch : 'full'}
]