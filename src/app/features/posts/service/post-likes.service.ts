import { inject, Injectable } from '@angular/core';
import { SingleTonApiService } from '../../../core/services/single-ton-api.service';
import { Observable } from 'rxjs';
import { LikesType } from '../../../core/interface/likes';

@Injectable({
  providedIn: 'root'
})
export class PostLikesService {

  private readonly TableName : string = "post_likes";
  private readonly singleTonApi = inject(SingleTonApiService);
  
  addLike(data : LikesType) : Observable<LikesType>{
  return this.singleTonApi.insert(this.TableName , data);
  }

  removeLike(post_id : number , user_id : string) : Observable<void>{
  return this.singleTonApi.delete(this.TableName , {post_id , user_id});
  }

  listenForPostLikes () : Observable<any> {
  return this.singleTonApi.RealTime(this.TableName );
  }
  
}
