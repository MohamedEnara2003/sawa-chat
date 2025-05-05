import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { Messages } from "../../features/chat/interface/messages";
import { inject } from "@angular/core";
import { MessagesService } from "../../features/chat/service/messages.service";
import { ChatStore } from "../chats/chats.signal";
import { catchError, EMPTY, of, switchMap, tap } from "rxjs";
import { FileUploadService } from "../../core/services/file-upload-service.service";
import { UserStore } from "../users/users.signal";


interface MessagesState {
    messages : Messages[],
    chat_id : string ,
    lastMessage : Messages | undefined,
    isLoading : boolean ,
    error : string ,
    file_url : string ;
    file_name : string ;
    file_type : string ;
    chatContainer : HTMLElement | undefined,
    lastFileSignature : string ,
    previewUrl : string | ArrayBuffer | null ,
    isLoadingUpload : boolean ,
    errorUpload :  string,
};

const initialState : MessagesState = {
    messages : [] ,
    chat_id : '',
    lastMessage : undefined ,
    file_url : '' ,
    file_type : '' ,
    file_name : '' ,
    chatContainer : undefined ,
    isLoading : false ,
    error : '' ,
    lastFileSignature : '' ,
    previewUrl : '' ,
    isLoadingUpload : false ,
    errorUpload :  '' ,
};  

export const MessageStore = signalStore(
    {providedIn : 'root'},
    withState(initialState),
    withMethods((
    store , 
    messagesService = inject(MessagesService),
    chatStore = inject(ChatStore) ,
    userStore = inject(UserStore) ,
    fileUploadService = inject(FileUploadService) ,
    ) => ({

    addMessage (chat_id : string , message : string) : void {
    const sender_id = userStore.user()?.user_id  ;
    const receiver_id = chatStore.chat()?.user1_id.user_id  ;

    if(receiver_id && sender_id){
    const messageData : Messages = {
    chat_id ,sender_id, receiver_id , message ,
    file_url : store.file_url(),
    file_type : store.file_type(),
    file_name : store.file_name(),
    }
    messagesService.addMessage(messageData).subscribe();
    this.removeFileData ();
    }
    },

    getMessage (chatId: string , chatContainer : HTMLElement) : void { 
        patchState(store , ({isLoading : true , chatContainer}))
        messagesService.getMessages(chatId).pipe(
        tap((messages) => {
        patchState(store , ({isLoading : false , messages}))
        }),
        catchError((err : Error) => {
        patchState(store , ({isLoading : false , error : err.message}))
        return of([])
        }),
        ).subscribe();
    },

    uploadFile(file : File) : void {
    const signature = `${file.name}-${file.size}`;
    if(signature !== store.lastFileSignature()){ 
    patchState(store , ({isLoadingUpload : true ,lastFileSignature : signature}));
    fileUploadService.compressAndPreview(file).pipe(
    switchMap((data) => {
    const filePath = `${Date.now()}_${data.compressedFile.name}`;
    patchState(store , ({isLoadingUpload : false , previewUrl : data.previewUrl}))

    return messagesService.upLoadFile(filePath , data.compressedFile).pipe(
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
    }
    },

    removeUploadedImage() : void {
    this.removeFileData ();
    messagesService.removeFile(store.file_name());
    },
    
    removeFileData () : void {
        patchState(store , ({file_name : '' , file_url : '' , previewUrl : '' , lastFileSignature : ''}))
    },

    initMessageRealTime(chatId: string) : void {    
    messagesService.listenForNewMessages(chatId).pipe(
    tap((updated) => {
    if(updated.eventType === 'INSERT'){
    patchState(store, { isLoading: false, messages: [...store.messages(), updated.new] });
    }
    })
    ).subscribe()
    },
    
    getChatId(chat_id : string) : void {
    patchState(store , ({chat_id}))
    },

    scrollChatContanierToBottom () : void {
    const container =  store.chatContainer();
    if(container){
    setTimeout(() => {
    container.scrollTop =  container.scrollHeight;
    },50);
    }
    }

    })
)

)