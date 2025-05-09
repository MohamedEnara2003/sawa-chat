import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";


export interface ImageViewerState {
    file_url : string ;
    isLoad : boolean ;
}

const initialState : ImageViewerState ={
    file_url : '' ,
    isLoad : false ,
} 

export const ImageViewerStore = signalStore(
    {providedIn : 'root'},
    withState(initialState),
    withMethods((store) => {
    return {

    getImage(file_url : string , isLoad : boolean) : void {
    patchState(store ,({file_url , isLoad }));
    }

    }
    })

)