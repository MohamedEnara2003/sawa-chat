import { Component, inject, OnInit } from '@angular/core';
import { authClient } from '../../../../environments/environment';
import { UsersService } from '../../../../core/services/users.service';
import { Router } from '@angular/router';
import {  tap } from 'rxjs';

@Component({
  selector: 'app-auth-call-back',
  imports: [],
  template : `
  <section class="size-full flex flex-col justify-center items-center gap-5">
  <span class="loading loading-spinner w-30 text-sawa-primary"></span>
  <p class="text-white font-bold text-xl">Please wait, signing you in...</p>
  </section>
  `,
  styles: ``
})
export class AuthCallBackComponent implements OnInit{

  private readonly usersService = inject(UsersService);
  private readonly router = inject(Router);

  ngOnInit() {
    this.addUser();
  }
  
  async addUser() : Promise<void> {
    try {
      const { data, error } = await authClient.getUser();

      if (error || !data.user) {
      throw error || new Error('User not found');
      }

      const user = data.user;
      const identity_data = user.identities?.at(0)?.identity_data;
      const user_id : string = user.id;
      const email : string = user.email!;
      const fullName : string = identity_data?.['name'] || identity_data?.['fullName'];
    if(user_id  && email && fullName){ 
      this.usersService.addUser({user_id , email , fullName , role : 'user'}).pipe(
      tap(() => this.router.navigate(['/',{outlets : {primary : 'home/public' ,'profile-setup' : 'user'}}]))
      ).subscribe()
    }
    } catch (err) {
      console.error('Error adding user after Google SignIn:', err);
    }
  }
}
