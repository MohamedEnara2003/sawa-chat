import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals"
import { FollowersService } from "../../core/services/followers.service";
import { computed, inject } from "@angular/core";
import { catchError, Observable, of, tap } from "rxjs";
import { followerType, UserFollowerssData } from "../../core/interface/followers";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NotificationsStore } from "../notifications/notifications.signal";
import { UserStore } from "../users/users.signal";
import { ChatStore } from "../chats/chats.signal";



interface FollowersState  {
    followersData: UserFollowerssData[],
    followingData: UserFollowerssData[],
    isFollowing: boolean,
    follower : {avatar_url: string, fullName: string},
    following : {avatar_url: string, fullName: string},
    isLoading: boolean,
    error: string,
}

const initialState : FollowersState = {
    followersData: [],
    followingData: [],
    follower: {avatar_url: '', fullName: ''},
    following: {avatar_url: '', fullName: ''},
    isFollowing: false,
    isLoading: false,
    error: '',
}
export const FollowersStore = signalStore(
    {providedIn : 'root'} ,
    withState(initialState),
    withComputed((store)=> ({
    followingCount : computed<number>(() => store.followingData().length),
    followersCount : computed<number>(() => store.followersData().length),
    })),
    withMethods((store) => {
    const followersService = inject(FollowersService);
    const userStore = inject(UserStore) ;
    const chatStore = inject(ChatStore) ;
    const notificationsStore = inject(NotificationsStore);

    return {
    addFollow( ) : void {
    const following_id = userStore.userProfile()?.user_id ;
    if(following_id){ 
    const data : followerType = {follower_id : userStore.user_id() ,following_id}
    followersService.addFollow(data).subscribe();
    chatStore.addChat(data.follower_id , following_id);
    const follower = {
    avatar_url: userStore.user()?.avatar_url!,
    fullName: userStore.user()?.fullName!
    } ;
    const following = {
    avatar_url: userStore.userProfile()?.avatar_url!,
    fullName: userStore.userProfile()?.fullName!
    };
    patchState(store, ({isFollowing : true , follower , following}));
    notificationsStore.addNotification('follow' , following_id , null);
    }
    },

    unFollow() : void {
    const follower_id = userStore.user_id();
    const following_id = userStore.userProfile()?.user_id;  
    if(following_id) 
    followersService.unfollow(follower_id, following_id).subscribe();
    patchState(store, ({isFollowing : false}));
    },

    getFollowingUsers() : void {
    const follower_id = userStore.user_id();
    if(follower_id && store.followingData().length < 1) { 
    patchState(store, ({isLoading : true}))
    followersService.getFollowersOrFollowingUsers({follower_id}).pipe(
    tap((followingData) => patchState(store, ({isLoading : false, followingData}))), 
    catchError((err : Error) => {
    patchState(store, ({isLoading : false, error : err.message}))
    return of([])
    }),
    )
    .subscribe();
    }
    },

    getFollowers(follwing_id : string): void{
    if(store.followersData().length < 1) { 
    if(!follwing_id) return;
    patchState(store, ({isLoading : true}))
    followersService.getFollowersOrFollowingUsers({follwing_id }).pipe(
    tap((followingData) => patchState(store, ({isLoading : false, followingData}))), 
    catchError((err : Error) => {
    patchState(store, ({isLoading : false, error : err.message}))
    return of([])
    }),
    )
    .subscribe();
    }
    },

    isUserFollowing(following_id : string , follower_id : string ) : void {
    if(store.isFollowing() === false){
    followersService.isFollowing(follower_id, following_id).pipe(
    tap((isFollowing) => patchState(store, ({isFollowing}))),
    ).subscribe()
    }
    },

    getFollowingIds(currentUserId : string) : Observable<string[]> {
    return followersService.getFollowingIds(currentUserId)
    },

    initRealTime() : void {
    followersService.listenRealTime().pipe(
    tap((updated) => {
    const {eventType : event, new: newData, old: oldData} = updated;
    if (event === 'INSERT') {

    const userFollowing : UserFollowerssData = {
    ...newData,
    follower: store.follower(),
    following: store.following(),
    } 
    const followingData = [...store.followingData(), userFollowing].filter((item) => {
    return item.follower_id === userStore.user_id() && item.following_id !== userStore.user_id()
    })
    patchState(store, ({followingData}));
    }
    if (event === 'DELETE') {
    const followingData : UserFollowerssData[] =  
    store.followingData().filter((item) => item.id !== oldData.id);
    patchState(store, ({followingData}));
    }  
    }),takeUntilDestroyed()
    ).subscribe()
    }
    }
    })
)