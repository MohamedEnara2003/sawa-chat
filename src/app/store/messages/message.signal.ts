import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { Messages } from "../../features/chat/interface/messages";
import {inject } from "@angular/core";
import { MessagesService } from "../../features/chat/service/messages.service";
import { catchError, EMPTY, of, switchMap, tap } from "rxjs";
import { FileUploadService } from "../../core/services/file-upload-service.service";
import { UserStore } from "../users/users.signal";
import { SoundEffectStore } from "../sound/sound.signal";


interface MessagesState {
    messages : Messages[],
    chat_id : string ,
    lastMessage : Messages | undefined,
    isLoading : boolean ,
    error : string ,
    file_url : string,
    file_name : string,
    file_type : string,
    chatContainer : HTMLElement | undefined,
    lastFileSignature : string,
    previewUrl : string | ArrayBuffer | null ,
    isLoadingUpload : boolean,
    errorUpload : string,
};

const initialState : MessagesState = {
    messages : [],
    chat_id : '',
    lastMessage : undefined,
    file_url : '' ,
    file_type : '' ,
    file_name : '' ,
    chatContainer : undefined,
    isLoading : false,
    error : '',
    lastFileSignature : '',
    previewUrl : '',
    isLoadingUpload : false,
    errorUpload :  '',
};  

export const MessageStore = signalStore(
    {providedIn : 'root'},
    withState(initialState),
    withMethods((store) => {
    const messagesService = inject(MessagesService);
    const userStore = inject(UserStore);
    const fileUploadService = inject(FileUploadService);
    const soundEffectStore = inject(SoundEffectStore);
    return { 
        
    addMessage (chat_id : string , message : string , receiver_id : string ) : void {
    const sender_id = userStore.user()?.user_id;
    if(receiver_id && sender_id){
    const messageData : Messages = {
    chat_id ,sender_id, receiver_id , message ,
    file_url : store.file_url(),
    file_type : store.file_type(),
    file_name : store.file_name(),
    }
    messagesService.addMessage(messageData).pipe(
    tap(() => this.scrollChatContanierToBottom())
    ).subscribe();
    this.removeFileData();
    }
    },

getMessage (chatId : string) : void { 
    const existingChatId = store.messages().length > 0 && store.messages()[0]?.chat_id === chatId;
    if(!existingChatId){ 
        patchState(store , ({isLoading : true }))
        messagesService.getMessages(chatId).pipe(
        tap((messages) => {
        patchState(store , ({isLoading : false , messages}))
        }),
        catchError((err : Error) => {
        patchState(store , ({isLoading : false , error : err.message}))
        return of([])
        }),
    ).subscribe();
}
},

    uploadFile(file : File) : void {
        const signature = `${file.name}-${file.size}`;
        if(signature !== store.lastFileSignature()){ 
        patchState(store , ({isLoadingUpload : true ,lastFileSignature : signature}));
        fileUploadService.compressAndPreview(file).pipe(
        switchMap((data) => {
        patchState(store , ({isLoadingUpload : false , previewUrl : data.previewUrl}))
        return messagesService.upLoadFile(data.fileName  , data.compressedFile).pipe(
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
        patchState(store , ({file_name : '' , file_url : '' , previewUrl : '' , lastFileSignature : ''}));
        },
    getChatContanier(chatContainer : HTMLElement ) : void {
    patchState(store , ({chatContainer}))
    },
    scrollChatContanierToBottom () : void {
    const container = store.chatContainer();
    if(container){
    setTimeout(() => {
    container.scrollTop =  container.scrollHeight;
    },200);
    }
    },

    initMessageRealTime(chatId : string) : void {   
        messagesService.listenForNewMessages(chatId).pipe(
        tap((updated) => {
        if(updated.eventType === 'INSERT'){
        if(updated.new.sender_id !== userStore.user_id()){
        soundEffectStore.handlSoundEffect('sound-effects/ReceiveMessage.wav')
        }else if(updated.new.sender_id === userStore.user()?.user_id){
        soundEffectStore.handlSoundEffect('sound-effects/SendMessage.wav');
        }
        patchState(store, { isLoading: false, messages: [...store.messages(), updated.new] });
        }
        }),
        ).subscribe()
    },
    
    }}
)

)