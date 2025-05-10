import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { timer } from "rxjs";


interface SoundEffect {
    soundEle : HTMLAudioElement | undefined,
    soundEffect_Url : string ,
    isLoading : boolean,
}

const initialValue : SoundEffect = {
    soundEle : undefined ,
    soundEffect_Url : '',
    isLoading : true ,
}

export const SoundEffectStore = signalStore(
    {providedIn : 'root'},
    withState(initialValue),

    withMethods((store) => {
    return {
    initSoundEffect(soundEle : HTMLAudioElement) : void {
    patchState(store , ({soundEle}));
    store.soundEle()?.pause();
    },
    handlSoundEffect(soundEffect_Url : string) : void {
    patchState(store , ({soundEffect_Url , isLoading : true}));
    timer(500).subscribe(() => patchState(store , ({soundEffect_Url : '', isLoading : true})))
    },
    }
    })
)