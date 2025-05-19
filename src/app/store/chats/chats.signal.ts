import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { ChatUserData } from "../../features/chat/interface/chat";
import { computed, inject } from "@angular/core";
import { ChatService } from "../../features/chat/service/chat.service";
import { catchError, EMPTY, of, switchMap, tap } from "rxjs";
import { UserStore } from "../users/users.signal";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";


interface ChatState {
    chats : ChatUserData[],
    vlaue : string ,
    chat : ChatUserData | undefined,
    isLoading : boolean ,
    error : string ,
    isChatFormFocus : boolean ,
};

const initialState : ChatState = {
    chats : [] ,
    chat : undefined ,
    vlaue : '',
    isLoading : false ,
    error : '',
    isChatFormFocus : false ,
};  

export const ChatStore = signalStore(
    {providedIn : 'root'},
    withState(initialState),
    withComputed((store) => {
    return {
    chatsFiltering : computed<ChatUserData[]>(() => {
        if(store.vlaue().length > 0){ 
            return store.chats().filter((chat) => {
            return chat.user1_id.fullName.includes(store.vlaue().toLowerCase()) ||
            chat.user1_id.user_id.includes(store.vlaue().toLowerCase()) 
        })
    }else return store.chats() ;
    }),
    
    }
    }),
    withMethods((store) => {
    const chatService = inject(ChatService);
    const userStore = inject(UserStore);
    return{ 

    addChat() : void {
    const user1_id = userStore.user_id();
    const user2_id = userStore.userProfile()?.user_id ;
    if (!user1_id || !user2_id || user1_id === user2_id) return;
    chatService.isExistingChat(user1_id , user2_id).pipe(
    switchMap((existingChat) => {
    if(existingChat) return EMPTY;
    return chatService.addChat({user1_id, user2_id});
    }),
    catchError(() => EMPTY)
    ).subscribe()
},

    getChats() : void {
    const user_id = userStore.user_id() ;
    if(user_id && store.chats().length < 1) {
    patchState(store , ({isLoading : true}));
    chatService.getChats(user_id).pipe(
    tap((chats) => patchState(store , ({isLoading : false , chats}))),
    catchError((err : Error) => {
    patchState(store , ({isLoading : false , error : err.message}));
    return of([])
    }),takeUntilDestroyed()
    ).subscribe()
    }
    },

    getChat(chatId : string) : void {
    const chat = store.chats().find((chat) => chat.id === chatId);
    patchState(store , ({chat}));
    },
    
    onChangeValueFiltering(vlaue : string) : void {
    patchState(store , ({vlaue}))
    },

    isChatFocus(isFoucs : boolean) : void {
    patchState(store , ({isChatFormFocus : isFoucs}));
    }
    }
    })
)