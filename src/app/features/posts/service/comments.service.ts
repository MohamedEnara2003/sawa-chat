import { inject, Injectable } from '@angular/core';
import { SingleTonApiService } from '../../../core/services/single-ton-api.service';
import { from, map, Observable } from 'rxjs';
import { CommentsType, UserCommentstData } from '../../../core/interface/comments';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private readonly tableName : string = "comments" ;
  private readonly singleTonApi = inject(SingleTonApiService);
  
  addComment(data : CommentsType) : Observable<CommentsType> {
  return this.singleTonApi.insert(this.tableName , data) ;
  }

  getComments (post_id : number) : Observable<UserCommentstData[]> {
  const promise = this.singleTonApi.supabase.from(this.tableName)
  .select(`
  id,
  created_at,
  post_id ,
  user_id,
  value,
  user:user_id(fullName,avatar_url)
  `).eq('post_id' , post_id)
  promise.order('created_at' , {ascending : true});
  return from(promise).pipe(map((res) => {
  if(res.error) return [] ;
  const comments = res.data.map((item) =>
  ({...item , user : Array.isArray(item.user) ? item.user[0] : item.user}));
  return comments
  }))
  }

  listenForAddedComments () : Observable<any> {
  return this.singleTonApi.RealTime(this.tableName);
  }
}
