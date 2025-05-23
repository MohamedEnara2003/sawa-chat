import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { timer } from "rxjs";


interface SoundEffect {
    soundEffect_Url : string ,
    isLoading : boolean,
}

const initialValue : SoundEffect = {
    soundEffect_Url : '',
    isLoading : true ,
}

export const SoundEffectStore = signalStore(
    {providedIn : 'root'},
    withState(initialValue),

    withMethods((store) => {
    return {
    handlSoundEffect(soundEffect_Url : string) : void {
    patchState(store , ({soundEffect_Url , isLoading : true}));
    timer(500).subscribe(() => patchState(store , ({soundEffect_Url : '', isLoading : false})))
    },  
    }
    })
)