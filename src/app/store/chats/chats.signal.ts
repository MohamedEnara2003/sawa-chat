import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { ChatType, ChatUserData } from "../../features/chat/interface/chat";
import { inject } from "@angular/core";
import { ChatService } from "../../features/chat/service/chat.service";
import { catchError, map, of, tap } from "rxjs";
import { UserStore } from "../users/users.signal";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";


interface ChatState {
    chats : ChatUserData[],
    chat : ChatUserData | undefined,
    user1_id : string ,
    user2_id : string ,
    isLoading : boolean ,
    error : string ,
};

const initialState : ChatState = {
    chats : [] ,
    chat : undefined ,
    user1_id : '' ,
    user2_id : '' ,
    isLoading : false ,
    error : ''
};  

export const ChatStore = signalStore(
    {providedIn : 'root'},
    withState(initialState),
    withMethods((store) => {
    const chatService = inject(ChatService);
    const userStore = inject(UserStore);
    return{ 

    addChat() : void {
    const user1_id = userStore.user_id();
    const user2_id = userStore.userProfile()?.user_id ;
    if(user1_id && user2_id){
    patchState(store , ({user1_id , user2_id}));
    const chatData : ChatType = {user1_id, user2_id};
    const existingChat = store.chats().some((chat) => 
    chat.user1_id.user_id === user1_id && chat.user2_id.user_id === user2_id ||
    chat.user1_id.user_id === user2_id && chat.user2_id.user_id === user1_id 
    )
    if(!existingChat)
    chatService.addChat(chatData).subscribe();
    }
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
    
    getChat(chatId : string) : void {
    const chat = store.chats().find((chat) => chat.id === chatId);
    patchState(store , ({chat}));
    },

    initRealTimeForChats() : void {
        chatService.listenChats().pipe(
        tap((updated) => {
        const {eventType : event , new : newData , old : oldData} = updated ;
        if(event === "INSERT") {
            const newChat : ChatUserData = {
                id : newData.id!,
                created_at  :newData.created_at!,
                user1_id : {
                user_id :  store.user1_id(),
                fullName : userStore.user()?.fullName!,
                avatar_url : userStore.user()?.avatar_url!
                },
                user2_id : {
                user_id : store.user2_id(),
                },
        }
        patchState(store , ({chats : [...store.chats() , newChat]}));
        
        }
        }),takeUntilDestroyed()
        ).subscribe()

    } 
    
    }
    })
)