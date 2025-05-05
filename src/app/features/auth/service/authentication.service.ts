import { inject, Injectable,   } from '@angular/core';
import { from, Observable } from 'rxjs';
import { authClient } from '../../../environments/environment';
import { UsersService } from '../../../core/services/users.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private usersService = inject(UsersService) ;

  signUp(fullName : string, email : string , password : string) : Observable<any> {
    const promise = authClient.signUp({email , password , options : {
    data : {fullName} 
    }}).then(async ({ data, error }) => {
    if (error || !data.user) throw error;
    const user_id : string  = data.user.id;
    const email : string = data.user.email!;
    const fullName : string = data.user.user_metadata?.['fullName'];
    this.usersService.addUser({user_id , email , fullName , role : 'user'}).subscribe()
    })
  
    return from(promise);
    }

  signIn(email : string , password : string) : Observable<any> {
  const promise = authClient.signInWithPassword({email , password})
  return from(promise) ;
  }
  
  signOut() : void {
  authClient.signOut() ;
  }

}
