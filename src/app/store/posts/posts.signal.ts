import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { postStatus, PostType, UserPostData } from "../../core/interface/posts";
import { computed, inject } from "@angular/core";
import { catchError, EMPTY, of, switchMap, tap } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { PostsService } from "../../features/posts/service/posts.service";
import { FileUploadService } from "../../core/services/file-upload-service.service";
import { UserStore } from "../users/users.signal";
import { FollowersService } from "../../core/services/followers.service";


export interface PostState  {
    posts : UserPostData[], 
    post : UserPostData | undefined, 
    isLoading : boolean,
    error : string ,
    user : {fullName : string, avatar_url : string} ,
    file_url  : string, 
    file_name : string,
    previewUrl : string | ArrayBuffer | null,
    isLoadingUpload : boolean,
    errorUpload :  string,
}

const initialState : PostState = {
    posts : [] ,
    post : undefined ,
    user : {fullName : '' , avatar_url : ''} ,
    isLoading : false ,
    error : 'string' ,
    file_url  : '', 
    file_name : '', 
    previewUrl : '', 
    isLoadingUpload : false ,
    errorUpload : '', 
}

export const PostsStore = signalStore(
    {providedIn : 'root'} ,
    withState(initialState),

    withComputed((store) => ({
    publicPosts: computed(() => store.posts().filter((post) => post.privacy === "public")),
    followingPosts: computed(() => store.posts().filter((post) => post.privacy === "followers")),
    })),

    withMethods((store , 
    userStore = inject(UserStore),  
    postsService= inject(PostsService), 
    followersService= inject(FollowersService), 
    fileUploadService= inject(FileUploadService), 
    ) => ({
    uploadImage(file : File) : void {
    patchState(store , ({isLoadingUpload : true}));
        fileUploadService.compressAndPreview(file).pipe(
        switchMap((data) => {
        const filePath = `${Date.now()}_${data.compressedFile.name}`;
        patchState(store , ({isLoadingUpload : false , previewUrl : data.previewUrl}))
        return postsService.uploadFilePost(filePath , data.compressedFile).pipe(
        tap(({file_url , file_name}) => {
        patchState(store ,({isLoadingUpload : false ,file_url , file_name}))
        }),
        catchError((err : Error) => {
        patchState(store ,({errorUpload : err.message , isLoadingUpload: false }))
        return EMPTY
        })
        )
        })
    ).subscribe()
    },
    
    removeUploadedImage() : void {
    if(store.previewUrl() !== '') { 
    postsService.removeFilePost(store.file_name());
    patchState(store , ({file_name : '' , file_url : '' , previewUrl : ''}));
    }
    },
    
    createPost (value : string, privacy : postStatus) : void {
    const post : PostType = {
    user_id : userStore.user_id(),
    value,
    privacy,
    file_url : store.file_url(),
    file_name : store.file_name(),
    } 
    postsService.createPost(post).subscribe();
    const user = {fullName : userStore.user()?.fullName! , avatar_url : userStore.user()?.avatar_url!}
    patchState(store , ({file_name : '' , file_url : '' , previewUrl : '' , user,}));
    },

    editPost(value : string, privacy : postStatus) : void {
    const id = store.post()?.id;
    if(id) {
        const updatedPost : PostType = {
            id,
            created_at : new Date().toISOString() ,
            user_id : userStore.user_id(),
            value,
            privacy,
            file_url : store.file_url(),
            file_name : store.file_name(),
        } 
    postsService.editPost(id, updatedPost).subscribe();
    patchState(store , ({file_name : '' , file_url : '' , previewUrl : ''}));
    }
    },

    removePost(id : number) : void {
    postsService.removePost(id).subscribe();
    const posts = store.posts().filter((post) => post.id !== id);
    patchState(store , ({posts}));
    },

    getPublicPosts() : void {
    const user_id = userStore.user_id();
if(store.posts().length < 1) { 
    patchState(store , ({ isLoading : true}))
    postsService.getPublicPosts(user_id).pipe(
    tap((res) => {
    const posts = res.sort((post) => post.user_id === user_id ? -1 : 1) ;
    patchState(store , ({ isLoading : false ,posts}));
    }),  
    catchError((err : Error) => {
    patchState(store , ({ isLoading : false ,error : err.message}));
    return of([])
    }), 
    ).pipe(
    takeUntilDestroyed()
    ).subscribe();
}
    },
    
    getFollowingPosts() : void {
    const user_id = userStore.user_id();
if(store.posts().length < 1){ 
    patchState(store , ({ isLoading : true}))
    followersService.getFollowingIds(user_id).pipe(
    switchMap((ids) => {
    const userAndFollowingIds = [...ids  ,user_id ];
    return postsService.getFollowingPosts(user_id , userAndFollowingIds).pipe(
    tap((res) => {
    const posts = [...store.posts() , ...res.sort((post) => post.user_id === user_id ? -1 : 1)];
    patchState(store , ({ isLoading : false ,posts}));
    }), 
    catchError((err : Error) => {
    patchState(store , ({ isLoading : false ,error : err.message}));
    return of([])
    }),
    )
    })
    ).pipe(
    takeUntilDestroyed()
    ).subscribe();
}
    },


    openModlePostEdit(postId : number ) : void {
    const post =  store.posts().find((post) => post.id === postId);
    patchState(store , ({post ,
    file_url : post?.file_url , previewUrl : post?.file_url , file_name : post?.file_name}));
    },

    updateLikesCount(post_id: number, isLike: boolean): void {
        const post = store.posts().find((post) => post.id === post_id);
        if (post) {
        const updatedPost: UserPostData = {
            ...post,
            likes: {
            ...post.likes,
            count: isLike ? post.likes?.count!  + 1 : post.likes?.count! - 1,
            },
            isLiked: isLike,
        };
        const posts: UserPostData[] = store.posts()
            .map(p => p.id === post_id ? updatedPost : p)
            .sort(post => post.user_id === userStore.user_id() ? -1 : 0);
        patchState(store, { posts });
        }
    },

    initRealTimeForPosts() : void {
    postsService.listenForPosts().pipe(
    tap((updated) => {
    const newPost : PostType = updated.new;
    if(updated.eventType === 'INSERT'){
    const posts = [...store.posts() , {...newPost , user : store.user()}].sort(
    (post) => post.user_id === userStore.user_id() ? -1 : 0 );
    patchState(store , ({posts}))
    }
    if(updated.eventType === 'UPDATE'){
    const posts = store.posts().map((post) => 
    post.id === newPost.id 
    ? { ...newPost, user: {fullName: post.user.fullName, avatar_url: post.user.avatar_url }} 
    : post
    ).sort((post) => post.user_id === userStore.user_id() ? -1 : 0);
    patchState(store, {posts});
    }
    return EMPTY ;
    }),takeUntilDestroyed()
    ).subscribe()
    }
    }))
)