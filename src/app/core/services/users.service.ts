import { inject, Injectable } from '@angular/core';
import { SingleTonApiService } from './single-ton-api.service';
import { from, map, Observable } from 'rxjs';
import {  UploadFileData, UserEditableData, userType } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly tableName : string = "users" ;
  private readonly bucketName : string = "users" ;
  private readonly columnUserId : string = "user_id" ;
  private readonly singleTonService = inject(SingleTonApiService) ;
  
  getUsers() : Observable<userType[]> {
  return this.singleTonService.getData(this.tableName);
  }

  getUserByUserId(user_id : string) : Observable<userType> {
  return this.singleTonService.getWhere(this.tableName , this.columnUserId, user_id);
  }

  getUserData(user_id : string) : Observable<{fullName :string, avatar_url : string}> {
  const promise = this.singleTonService.supabase.from(this.tableName)
  .select('fullName,avatar_url').eq('user_id' , user_id).single();
  return from(promise).pipe(map((res) => res.data!))
  }
  
  addUser (data: userType) : Observable<userType> {
  return this.singleTonService.insert(this.tableName , data) ;
  }
  
  updateUserImage (user_id : string, data : UserEditableData)  : Observable<UserEditableData> {
  return this.singleTonService.update(this.tableName , this.columnUserId , user_id , data) ;
  }

  uploadUserImage (filePath : string , file: File) : Observable<UploadFileData>{
  return this.singleTonService.upload(this.bucketName , filePath , file) ;
  }
  
  removeUserImage(fileName: string) : Observable<void> {
  return this.singleTonService.deleteStorgeFile(this.bucketName ,fileName ) ;
  }
  
  updateProfile(user_id : string , data : UserEditableData) : Observable<UserEditableData> {
  return this.singleTonService.update(this.tableName , this.columnUserId , user_id , data)
  }
}