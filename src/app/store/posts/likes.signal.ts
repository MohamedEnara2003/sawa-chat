import { inject } from "@angular/core"
import {  signalStore, withMethods, withState } from "@ngrx/signals"
import { PostLikesService } from "../../features/posts/service/post-likes.service"
import { debounceTime } from "rxjs"
import { PostsStore } from "./posts.signal"
import { NotificationsStore } from "../notifications/notifications.signal";
import { UserStore } from "../users/users.signal"


interface LikesState  {}
const initialState : LikesState  = {}

export const PostsLikesStore = signalStore(
    {providedIn : 'root'},
    withState(initialState),

    withMethods((store) => {
    const postLikesService = inject(PostLikesService);
    const userStore = inject(UserStore);
    const postsStore = inject(PostsStore);
    const notificationsStore = inject(NotificationsStore);
    return {

    addPostLike(post_id : number) :void {
    const user_id =  userStore.user_id()
    const post = postsStore.posts().find(p => p.id === post_id);
    if(user_id && post && !post.isLiked){
    postLikesService.addLike({post_id , user_id}).pipe(
    debounceTime(300)
    ).subscribe(() => postsStore.updateLikesCount(post_id , true))
    notificationsStore.addNotification('like' , post.user_id , post_id);
    }
    },

    removePostLike(post_id : number) : void {
        const user_id =  userStore.user_id();
        const post = postsStore.posts().find(p => p.id === post_id);
        if(user_id && post && post.isLiked){
        postLikesService.removeLike(post_id , user_id).pipe(debounceTime(300))
        .subscribe(() =>   postsStore.updateLikesCount(post_id , false));
        }
    },

}
    })
)