import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { CommentsType, UserCommentstData } from "../../core/interface/comments";
import { inject } from "@angular/core";
import { CommentsService } from "../../features/posts/service/comments.service";
import { catchError, EMPTY, map, of, switchMap, tap } from "rxjs";
import { UsersService } from "../../core/services/users.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NotificationsStore } from "../notifications/notifications.signal";
import { UserStore } from "../users/users.signal";


interface FriendState  {
    comments : UserCommentstData[],
    postId : number ,
    isLoadComments : boolean ,
    isLoading : boolean ,
    error : string ,
}

const initialState : FriendState = {
    comments : [] ,
    postId : 0 ,
    isLoadComments : false ,
    isLoading : false ,
    error : '',
}

export const CommentsStore = signalStore(
    {providedIn : 'root'} ,
    withState(initialState),

    withMethods((store, 
    commentsService = inject(CommentsService) ,
    usersService = inject(UsersService) ,
    userStore = inject(UserStore) ,
    notificationsStore = inject(NotificationsStore),
    ) => ({
        
    openContainerComments(postId : number) : void {
    this.getComments(postId);
    patchState(store , ({postId ,isLoadComments : true}));
    },

    closeContainerComments() : void {
    patchState(store , ({isLoadComments : false}));
    },

    addComment(value : string , post_user_id : string) : void {
    if(store.postId() !== 0) { 
    const comment : CommentsType = {
    user_id : userStore.user_id(),
    post_id : store.postId() ,
    value
    }
    commentsService.addComment(comment).subscribe();
    notificationsStore.addNotification('comment' , post_user_id , store.postId());
    }
    },


    getComments(postId : number) : void {
        if(postId !== store.postId()){ 
        patchState(store , ({isLoading : true }))
        commentsService.getComments(postId).pipe(
        tap((res) => {
        const comments =res.sort((comment) => comment.user_id === userStore.user_id() ? 0 : -1 );
        patchState(store , ({isLoading : false , comments}));
        }),
        catchError((err : Error) => {
        patchState(store , ({error : err.message}))
        return of([]);
        })
        )
        .subscribe();
    }
    },

    initRealTimeForPostComment () : void {
    commentsService.listenForAddedComments().pipe(
    switchMap((updated) => {
    const newComment : CommentsType = updated.new;

    if(updated.eventType === 'INSERT'){
        return usersService.getUserData(newComment.user_id).pipe(
        map(({fullName , avatar_url}) => {
        const comments : UserCommentstData[] =
        [...store.comments() , {...newComment , user : {fullName , avatar_url }}].sort(
        (comment) => comment.user_id === userStore.user_id() ? 0 : -1 );
        patchState(store , ({comments}));
    }))
    }

    return EMPTY
    }),takeUntilDestroyed()
    ).subscribe()
    }

    }))
)

