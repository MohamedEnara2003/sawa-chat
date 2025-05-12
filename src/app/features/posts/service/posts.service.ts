import { inject, Injectable } from "@angular/core";
import { from, map, Observable } from "rxjs";
import { SingleTonApiService } from "../../../core/services/single-ton-api.service";
import { PostType, UserPostData } from "../../../core/interface/posts";
import { UploadFileData } from "../../../core/interface/user";


@Injectable({
    providedIn: 'root'
  })

export class PostsService {
  private readonly tableName : string = "posts" ;
  private readonly bucketName : string = "post" ;
  private readonly singleTonApi = inject(SingleTonApiService);
  private readonly SelectionPostData = `
  id,
  created_at,
  user_id,
  value,
  file_url,
  file_name,
  privacy,
  likes:post_likes(count),
  post_likes(user_id),  
  comments_count:comments(count),
  user:user_id(fullName,avatar_url)
  `;
  createPost(post : PostType) : Observable<PostType> {
  return this.singleTonApi.insert(this.tableName, post);
  }

  editPost(postId : number , data : PostType) :  Observable<PostType> {
  return this.singleTonApi.update(this.tableName, 'id' , postId , data);
  }
  removePost(id : number) : Observable<void>{
  return this.singleTonApi.delete(this.tableName , {id});
  }
  
  getPublicPosts(user_id : string) : Observable<UserPostData[]> {
  const promise =  this.singleTonApi.supabase.from(this.tableName)
  .select(this.SelectionPostData)
  .eq('privacy' , 'public')
  .order('created_at' , {ascending : false});
  return from(promise).pipe(map((res) => {
  if(res.error) return [] ;
  const items = res.data.map((item) =>
  ({...item , 
  comments_count : Array.isArray(item.comments_count) ? item.comments_count[0] : item.comments_count,
  likes : Array.isArray(item.likes) ? item.likes[0] : item.likes,
  isLiked :  Array.isArray(item.post_likes) && item.post_likes.some((like) => like.user_id === user_id),
  user : Array.isArray(item.user) ? item.user[0] : item.user,
  }));
  return items;
  }
  ));
  }

  getFollowingPosts(user_id : string , ids : string[]) : Observable<UserPostData[]> {
  const promise =  this.singleTonApi.supabase.from(this.tableName)
  .select(this.SelectionPostData)
  .in('user_id' , ids)
  .eq('privacy' , 'followers')
  .order('created_at' , {ascending : false});
  return from(promise).pipe(map((res) => {
  if(res.error) return [] ;
  const items = res.data.map((item) =>
  ({...item , 
  comments_count : Array.isArray(item.comments_count) ? item.comments_count[0] : item.comments_count,
  likes : Array.isArray(item.likes) ? item.likes[0] : item.likes,
  isLiked :  Array.isArray(item.post_likes) && item.post_likes.some((like) => like.user_id === user_id),
  user : Array.isArray(item.user) ? item.user[0] : item.user,
  }));
  return items;
  }
  ));
  }

  uploadFilePost( filePath: string, file: File) : Observable<UploadFileData>{
  return this.singleTonApi.upload(this.bucketName, filePath , file);
  }
  removeFilePost(filePath: string) : Observable<void>{
  return this.singleTonApi.deleteStorgeFile(this.bucketName , filePath) ;
  }
  listenForPosts() : Observable<any>{
  return this.singleTonApi.RealTime(this.tableName);
  }
} 