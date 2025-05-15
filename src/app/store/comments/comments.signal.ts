import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { CommentsType, UserCommentstData } from "../../core/interface/comments";
import { computed, inject } from "@angular/core";
import { CommentsService } from "../../features/posts/service/comments.service";
import { catchError, EMPTY, map, of, switchMap, tap } from "rxjs";
import { UsersService } from "../../core/services/users.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NotificationsStore } from "../notifications/notifications.signal";
import { UserStore } from "../users/users.signal";

interface CommentsState {
    readonly comments: UserCommentstData[];
    readonly postId: number;
    readonly isLoadComments: boolean;
    readonly isLoading: boolean;
    readonly error: string;
}

const initialState: CommentsState = {
    comments: [],
    postId: 0,
    isLoadComments: false,
    isLoading: false,
    error: '',
}

export const CommentsStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),

    withComputed((store, userStore = inject(UserStore)) => {
        const currentUserId = computed(() => userStore.user_id());

        return {
            sortedComments: computed(() => 
                store.comments().sort((a, b) => 
                    a.user_id === currentUserId() ? -1 : b.user_id === currentUserId() ? 1 : 0
                )
            ),

            hasComments: computed(() => store.comments().length > 0),
        };
    }),

    withMethods((store, 
        commentsService = inject(CommentsService),
        usersService = inject(UsersService),
        userStore = inject(UserStore),
        notificationsStore = inject(NotificationsStore),
    ) => ({
        openContainerComments(postId: number, isLoadComments: boolean): void {
            this.getComments(postId);
            patchState(store, ({ postId, isLoadComments }));
        },

        closeContainerComments(): void {
            patchState(store, ({ isLoadComments: false }));
        },

        addComment(value: string, post_user_id: string): void {
            if (store.postId() !== 0) {
                const comment: CommentsType = {
                    user_id: userStore.user_id(),
                    post_id: store.postId(),
                    value
                }
                commentsService.addComment(comment).subscribe();
                notificationsStore.addNotification('comment', post_user_id, store.postId());
            }
        },

        removeComment(id: number): void {
            commentsService.removeComment(id).subscribe();
        },

        getComments(postId: number): void {
            if (postId !== store.postId()) {
                patchState(store, ({ isLoading: true }));
                commentsService.getComments(postId).pipe(
                    tap((res) => {
                        const comments = res.sort((comment) => 
                            comment.user_id === userStore.user_id() ? 0 : -1
                        );
                        patchState(store, ({ isLoading: false, comments }));
                    }),
                    catchError((err: Error) => {
                        patchState(store, ({ error: err.message }));
                        return of([]);
                    })
                ).subscribe();
            }
        },

        initRealTimeForPostComment () : void {
            commentsService.listenForAddedComments().pipe(
            switchMap((updated) => {
            const {eventType : event , new : newData , old } = updated ;
            if(event === 'INSERT'){
                return usersService.getUserData(newData.user_id).pipe(
                map(({fullName , avatar_url}) => {
                const comments : UserCommentstData[] =
                [...store.comments() , {...newData , user : {fullName , avatar_url }}].sort(
                (comment) => comment.user_id === userStore.user_id() ? 0 : -1 );
                patchState(store , ({comments}));
            }))
            }

            if(event === 'DELETE'){
            const comments : UserCommentstData[]  = store.comments().filter((comment) => comment.id !== old.id).sort(
            (comment) => comment.user_id === userStore.user_id() ? 0 : -1 );
            patchState(store , ({comments}));
            }

            return EMPTY
            }),takeUntilDestroyed()
            ).subscribe()
        }

    }))
)

