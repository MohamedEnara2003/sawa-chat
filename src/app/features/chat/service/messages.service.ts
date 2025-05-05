import {inject, Injectable } from "@angular/core";
import {SingleTonApiService } from "../../../core/services/single-ton-api.service";
import {from, map, Observable } from "rxjs";
import {Messages } from "../interface/messages";
import { UploadFileData } from "../../../core/interface/user";


@Injectable({
  providedIn: 'root'
})

export class MessagesService {
  private readonly tableName : string = "messages";
  private readonly bucketName :string = "chat";
  private readonly columnEv : string = "chat_id";
  private readonly singleTonApi = inject(SingleTonApiService);

  addMessage(data : Messages) : Observable<Messages> {
  return this.singleTonApi.insert(this.tableName , data)
  }

  getMessages(chatId : string) : Observable<Messages[]> {
  const promise =  this.singleTonApi.supabase.from(this.tableName)
  .select('*')
  .eq(this.columnEv , chatId)
  return from(promise).pipe(map((res) => res.data || []))
  }
  
  upLoadFile(filePath: string, file: File) : Observable<UploadFileData> {
  return this.singleTonApi.upload(this.bucketName , filePath , file)
  }

  removeFile (filePath: string) : Observable<void>{
  return  this.singleTonApi.deleteStorgeFile(this.bucketName , filePath) ;
  }

  listenForNewMessages(chatId: string): Observable<any> {
  return this.singleTonApi.RealTime(this.tableName , `chat_id=eq.${chatId}`)
  }
  
}