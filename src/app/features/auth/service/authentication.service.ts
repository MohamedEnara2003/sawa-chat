import { Injectable} from '@angular/core';
import { from, Observable } from 'rxjs';
import { authClient } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  signInWithGoogle() : Observable<any> {
    const promise = authClient.signInWithOAuth({
    provider : "google" ,
    options : {
    redirectTo : 'https://sawa-chat.vercel.app/auth/call-back'
    }
  })
    return from(promise);
  }
  
  signUp(fullName : string, email : string , password : string) : Observable<any> {
    const promise = authClient.signUp({email , password , options : {
    data : {fullName}
    }})
    return from(promise);
  }

  signIn(email : string , password : string) : Observable<any> {
  const promise = authClient.signInWithPassword({email , password})
  return from(promise);
  }
  
  signOut() : void {
  authClient.signOut() ;
  }

}
