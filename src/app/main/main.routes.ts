import { Routes } from "@angular/router";
import { ProfileSetupComponent } from "../shared/components/profile-setup/ui/profile-setup.component";
import { ContainerAddPostComponent } from "../features/posts/components/container/container-add-post.component";
import { SearchComponent } from "../features/search/ui/search.component";
import { PostViewerComponent } from "../features/posts/components/post-viewer/post-viewer.component";



export const mainRoutes: Routes = [
    {path : 'home/:postStatus' , loadComponent : () => 
    import('../features/home/page/home.component').then(c => c.HomeComponent),
    } ,
    {path : 'profile' ,   loadComponent : () =>  
    import('../features/profile/ui/profile.component').then(c => c.ProfileComponent),
    loadChildren : () => import('../features/profile/profile.routes').then((r) => r.profileRoutes)
    },
    {path : 'user' , loadComponent : () => 
    import('../shared/components/profile-setup/ui/profile-setup.component').then(c => c.ProfileSetupComponent), outlet : 'profile-setup'},
    {path : 'user-profile/:userId' ,   loadComponent : () =>  
    import('../features/user/ui/user-profile.component').then(c => c.UserProfileComponent)
    },

    {path : 'chat' , data: { hideLayout: true } ,   loadComponent : () => 
    import('../features/chat/page/chat.component').then(c => c.ChatComponent),
    },

    {path : 'chat/:chatId' , data: { hideLayout: true }  ,  loadComponent : () => 
        import('../features/chat/page/chat.component').then(c => c.ChatComponent),
    },

    {path : 'create-post' , loadComponent : () => 
    import('../features/posts/components/container/container-add-post.component').then(c => c.ContainerAddPostComponent), outlet : 'container'},

    {path : 'settings' , loadComponent : () => 
    import('../features/settings/page/settings.component').then(c => c.SettingsComponent),
    },

    {path : 'search' , loadComponent : () => 
    import('../features/search/ui/search.component').then(c => c.SearchComponent),
    },

    {path : '' , redirectTo : '/home/public' , pathMatch : 'full'} ,
    {path : 'home' , redirectTo : '/home/public' , pathMatch : 'full'} ,
    {path : '**' , redirectTo : 'home' , pathMatch : 'full'} ,
]