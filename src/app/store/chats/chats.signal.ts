import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { ChatType, ChatUserData } from "../../features/chat/interface/chat";
import { inject } from "@angular/core";
import { ChatService } from "../../features/chat/service/chat.service";
import { catchError, of, tap } from "rxjs";
import { UserStore } from "../users/users.signal";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";


interface ChatState {
    chats : ChatUserData[]
    chat : ChatUserData | undefined
    isLoading : boolean ,
    error : string ,
};

const initialState : ChatState = {
    chats : [] ,
    chat : undefined ,
    isLoading : false ,
    error : ''
};  

export const ChatStore = signalStore(
    {providedIn : 'root'},
    withState(initialState),
    withMethods((store, 
    chatService = inject(ChatService) ,
    userStore = inject(UserStore) ,
    ) => ({

    addChat(user1_id : string , user2_id : string) : void {
    const chatData : ChatType = {user1_id, user2_id};
    
    const existingChat = store.chats().some((chat) => 
    chat.user1_id.user_id === user1_id && chat.user2_id.user_id === user2_id ||
    chat.user1_id.user_id === user2_id && chat.user2_id.user_id === user1_id 
    )
    
    if(!existingChat)
    chatService.addChat(chatData).subscribe();
    },
    

    getChats() : void {
    const user_id = userStore.user_id() ;
    if(user_id && store.chats().length < 1) {
    patchState(store , ({isLoading : true}));
    chatService.getChats(user_id).pipe(
    tap((chats) => {
    patchState(store , ({isLoading : false , chats}));
    }),
    catchError((err : Error) => {
    patchState(store , ({isLoading : false , error : err.message}));
    return of([])
    }),takeUntilDestroyed()
    ).subscribe()
    }
    },
    
    getChat(id : string) : void {
    const chat = store.chats().find((chat) => chat.id === id) ;
    patchState(store , ({chat}))
    }
    }))
)