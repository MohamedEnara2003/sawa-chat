import { inject, Injectable } from '@angular/core';
import { SingleTonApiService } from '../../../core/services/single-ton-api.service';
import { from, map, Observable } from 'rxjs';
import { ChatType, ChatUserData } from '../interface/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private readonly tableName : string = "chats" ;
  private readonly singleTonApi = inject(SingleTonApiService);

  addChat(data : ChatType) : Observable<ChatType> {
  return  this.singleTonApi.insert(this.tableName , data) ;
  }
  
  getChats(user_id : string) : Observable<ChatUserData[]> {
  const promise =  this.singleTonApi.supabase.from(this.tableName)
  .select(`
    id,
    created_at,
    user1_id:user1_id (
      user_id,
      fullName,
      avatar_url
    ),
    user2_id:user2_id (
      user_id,
      fullName,
      avatar_url
    )
  `)
  return from(promise).pipe(map((res) => res.data!.map((item) => {
  const chatsData = {...item , 
  user1_id : Array.isArray(item.user1_id) ?  item.user1_id[0] : item.user1_id ,
  user2_id : Array.isArray(item.user2_id) ?  item.user2_id[0] : item.user2_id
  }
  const chats = {
  user1_id : chatsData.user1_id.user_id === user_id ?  chatsData.user2_id : chatsData.user1_id ,
  user2_id : chatsData.user1_id.user_id !== user_id ?  chatsData.user2_id : chatsData.user1_id ,
  }
  
  return {
  ...chats ,
  id : chatsData.id ,
  created_at : chatsData.created_at
  }
  })))
  }  

  isExistingChat(user1_id : string, user2_id : string) : Observable<boolean> {
  const promise = this.singleTonApi.supabase.from(this.tableName)
  .select('id')
  .or(`and(user1_id.eq.${user1_id},user2_id.eq.${user2_id}),and(user1_id.eq.${user2_id},user2_id.eq.${user1_id})`)
  .maybeSingle()
  return from(promise).pipe(map((res) => res.data ? true : false))
  }

  listenChats() : Observable<any> {
  return this.singleTonApi.RealTime(this.tableName)
  }

} 
