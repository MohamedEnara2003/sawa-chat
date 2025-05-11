import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { userDetails, UserEditableData, userType } from "../../core/interface/user";
import { computed, inject } from "@angular/core";
import { UsersService } from "../../core/services/users.service";
import { catchError, EMPTY,   Observable,   switchMap,  tap } from "rxjs";
import { authClient } from "../../environments/environment";
import isEqual from 'lodash/isEqual';
import { Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FileUploadService } from "../../core/services/file-upload-service.service";


interface UserState  {
    user : userType | undefined, 
    userProfile : userType | undefined, 
    users : userType[] , 
    user_id : string ,
    serachValue : string ,
    isLoading : boolean ,
    error : string ,
    file_url : string ,
    file_name : string ,
    previewUrl : string | ArrayBuffer | null ,
    errorUpload :  string,
}
const initialState : UserState = {
    users : [] ,
    user : undefined , 
    userProfile : undefined , 
    user_id : '' ,
    serachValue : '' ,
    isLoading : false ,
    error : 'string' ,
    file_url : '' ,
    file_name : '' ,
    previewUrl : '' ,
    errorUpload :  '' ,
}

export const UserStore = signalStore(
    {providedIn : 'root'} ,
withState(initialState) ,

withComputed(((store) => ({
    usersFilterSearch : computed<userType[]>(() => {
    if(store.serachValue().length > 0){ 
    return store.users().filter((user) => {
    return user.fullName.toLowerCase().includes(store.serachValue().toLowerCase())||
    user.email.toLowerCase().includes(store.serachValue().toLowerCase())||
    user.bio?.toLowerCase().includes(store.serachValue().toLowerCase())
    })
    }else return [] ;
    })
}))),

withMethods((store , 
usersService = inject(UsersService), 
fileUploadService = inject(FileUploadService), 
router = inject(Router), 
) => ({

LoadUsers () : void {
if(store.users().length < 1)
patchState(store , ({isLoading : true }));
usersService.getUsers().pipe(
    tap((users) => patchState(store , ({isLoading : false , users }))),
        catchError((err : Error) => {
        patchState(store , ({isLoading : false , error : err.message})) ;
        return EMPTY
    }),takeUntilDestroyed()
).subscribe();
},

LoadUser() : void  {
    patchState(store , ({isLoading : true}))
    authClient.onAuthStateChange((event ,  session) => {
    const user_id = session?.user.id;

if(user_id) { 
    patchState(store , ({isLoading : true , user_id }))
    usersService.getUserByUserId(user_id).pipe(
        tap((user) => patchState(store , ({isLoading : false , user , user_id }))),
        catchError((err : Error) => {
        patchState(store , ({isLoading : false , error : err.message})) ;
        return EMPTY
        })
    ).subscribe();
}
})
},

getUserProfileByUserId(userId : string) : void {
        if(store.userProfile()?.user_id !== userId){
            patchState(store , ({isLoading : true}))
            usersService.getUserByUserId(userId).pipe(
            tap((userProfile) => {
            patchState(store , ({isLoading : false , userProfile}))
            }),
            catchError((err : Error) => {
            patchState(store , ({isLoading : false , error : err.message})) ;
            return EMPTY
            }) , takeUntilDestroyed())
            .subscribe();
    }
},
getUserData(user_id : string) : Observable<{fullName: string, avatar_url: string;}>{
    return usersService.getUserData(user_id);
},
    upLoadUserImage (file : File) : void {
    if(store.previewUrl() !== ''){
    this.removeUploadedImage();
    }
    patchState(store , ({isLoading : true}))
    fileUploadService.compressAndPreview(file).pipe(
    switchMap((data) => {
    const filePath = `${Date.now()}_${data.compressedFile.name}`;
    patchState(store , ({isLoading : false , previewUrl : data.previewUrl}))

    return usersService.uploadUserImage(filePath , data.compressedFile).pipe(
    tap(({file_url , file_name}) => {
    patchState(store , ({isLoading : false,file_url, file_name  }))
    }),
    catchError((err : Error) => {
    patchState(store ,({errorUpload : err.message , isLoading: false }))
    return EMPTY
    })
    )
    })
    ).subscribe()

},

removeUploadedImage() : void {
    usersService.removeUserImage(store.user()?.avatar_name!).subscribe();
    patchState(store , ({file_url : '' , file_name : '' , previewUrl : ''}));
},

saveImage () : void {
    const user_id = store.user()?.user_id ;
    const avatar_url  = store.file_url() ;
    const avatar_name  = store.file_name() ; ;
    if(user_id && avatar_url  && avatar_name){
    const imageData : UserEditableData = {avatar_url , avatar_name};
    usersService.updateUserImage(user_id , imageData).subscribe();
    }
},

editBio (bio : string) : void {
patchState(store , (state) => ({isLoading : false , user : {...state.user! , bio}}))
},

editDetails (details : userDetails) : void {
patchState(store , (state) => ({isLoading : false , user : {...state.user! , details}}))
},

editSkills (skills : string[]) : void {
patchState(store , (state) => ({isLoading : false , user : {...state.user! , skills}}))
},

closeProfileEdit() : void {
const user_id = store.user()?.user_id ;
const prevUser = store.users().find((user) => user.user_id ===  user_id);
const currentUser = store.user();
const result = isEqual(prevUser , currentUser);
if(user_id) 
if(!result && currentUser){
const editProfile : UserEditableData  = {
    bio : currentUser?.bio ,
    details : currentUser?.details,
    skills : currentUser?.skills
};
usersService.updateProfile(user_id , editProfile).subscribe();
}
router.navigate(['/',{outlets : {'profile-setup' : null}}]);
},

onChangeSearchValue(serachValue : string) : void {
patchState(store , ({serachValue}));
}

}))

)