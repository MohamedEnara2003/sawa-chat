import { Component, inject, signal } from '@angular/core';
import { NotificationsStore } from '../../../store/notifications/notifications.signal';
import { SharedModule } from '../../../shared/modules/shared.module';
import { UserImageComponent } from "../../../shared/components/user-image/user-image.component";
import { DayJsService } from '../../../core/services/day-js.service';
import { NotificationHeaderComponent } from "../components/notification-header/notification-header.component";
import { Router } from '@angular/router';
import { NotificationsTypes } from '../../../core/interface/notifications';
import { UserStore } from '../../../store/users/users.signal';

@Component({
selector: 'app-notifications',
imports: [SharedModule, UserImageComponent, NotificationHeaderComponent],
template : `

<section class='w-full h-full flex flex-col gap-5'>
<app-notification-header />

<ul class="w-full h-full flex flex-col justify-start overflow-y-auto gap-4" style="scrollbar-width: none;">
@for (notification of notificationsStore.notifications(); track notification) {
@defer (on viewport) {

<li class="w-full relative border-b-2 border-b-background  shadow-lg p-2
hover:opacity-80 duration-200 cursor-pointer">

<button (click)="notificationsStore.removeNotification(notification.id!)"
class="absolute   top-0 right-0 btn-hover z-10">
<i class="fa-solid fa-close text-white text-sm"></i>
</button>

    <div class="w-full flex flex-wrap items-center gap-2 ">
    <div class="relative object-cover size-10 rounded-full">
    @let userimage = notification.avatar_url;
    <app-user-image [avatarUrl]="userimage" [isDefault]="userimage ? false : true"
    imageClass="object-cover size-full rounded-full"/>
    <span class="absolute -bottom-1 -left-1 size-6 bg-white flex justify-center items-center rounded-full
    shadow shadow-background">
    @for (item of notificationsMsg(); track item) {
    @if(notification.type === item.type){
    <i class="text-sm" [ngClass]="item.icon"></i>
    }
    }
    </span>
    </div>

    <div (click)="notificationRoute(notification.type , notification.from_user_id)"
    class="max-w-[70%] text-xs text-white ">
    <p> 
    <span class="font-semibold text-sawa-primary capitalize">
    {{notification.fullName}}
    </span> 
    @for (item of notificationsMsg(); track item) {
    {{notification.type === item.type ? item.msg : ''}}
    }
    </p>
    <h5 class="text-overlay text-[10px] ">
    {{dayJs.formatTime(notification.created_at!)}}
    </h5>
</div>

</div>
</li>
}@placeholder {
    <li class="w-full h-15 bg-tint animate-pulse rounded-2xl "></li>
}
}
</ul>
</section>
`,
})
export class NotificationsComponent  {
    readonly notificationsStore = inject(NotificationsStore);
    private readonly userStore = inject(UserStore);
    readonly dayJs = inject(DayJsService);
    private readonly router = inject(Router);

    notificationsMsg = signal<Array<{type : string , msg : string , icon : string}>>([
    {type : 'like' , msg : 'liked your post' , icon : 'fa-solid fa-heart text-red-500'},
    {type : 'comment' , msg : 'commented on your post' , icon : 'fa-solid fa-comment text-green-600'},
    {type : 'follow' , msg : 'started following you' , icon : 'fa-solid fa-user-plus text-blue-500'},
    ])

    constructor(){
    this.notificationsStore.getNotifications();
    this.notificationsStore.initRealTimeNotifications();
    }


    notificationRoute(type : NotificationsTypes , from_user_id : string) : void {
    if(type === 'follow'){
    this.router.navigate(['/user-profile/' , from_user_id]);
    }else if(type === 'like' || type === 'comment'){
    
    }
    }

}
