import { inject, Injectable,   } from '@angular/core';
import { from, Observable, tap } from 'rxjs';
import { authClient } from '../../../environments/environment';
import { UsersService } from '../../../core/services/users.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private usersService = inject(UsersService) ;

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
    const promise = authClient.signUp({email , password})
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
