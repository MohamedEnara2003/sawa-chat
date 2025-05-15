import { Injectable } from '@angular/core';
import { createClient, SupabaseClient} from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { catchError, EMPTY, from, map, Observable } from 'rxjs';
import { UploadFileData } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class SingleTonApiService {

    supabase : SupabaseClient ;
  
    constructor(){
    this.supabase = createClient(environment.supabaseUrl , environment.supabaseKey);
    }
    
    getData<G>(tableName : string) : Observable<G[]> {
    const promise = this.supabase.from(tableName).select('*') ;
    return from(promise).pipe(map((res) => res.data!))
    }

    getWhere<G>(tableName : string , column : string , value : string | number ) : Observable<G> {
    const promise = this.supabase.from(tableName).select('*').eq(column , value).maybeSingle() ;
    return from(promise).pipe(map((res) => res.data!))
    }

    insert<G>(tableName : string , data : G) : Observable<G> {
      const promise = this.supabase.from(tableName).insert(data).single() ;
      return from(promise).pipe(map((res) => res.data!))
    }

    update<G>(tableName : string , column : string , value : string | number,  data : G) : Observable<G> {
      const promise = this.supabase.from(tableName).update(data).eq(column , value) ;
      return from(promise).pipe(map((res) => res.data!))
    }

    delete(tableName : string , match : {}  ) : Observable<void> {
      const promise = this.supabase.from(tableName).delete().match(match) ;
      return from(promise).pipe(map(() => {}))
    }

    upload(bucketName : string , filePath : string ,  file: File , ):Observable<UploadFileData> {
      const promise = this.supabase.storage.from(bucketName).upload(filePath, file);
      return from(promise).pipe(map((res) => {
      const { data } = this.supabase.storage.from(bucketName).getPublicUrl(filePath);
      return {file_name : res.data?.path! , file_url :data.publicUrl};
      }));
    }

    deleteStorgeFile(bucketName : string , filePath: string): Observable<void> {
      const promise = this.supabase.storage.from(bucketName).remove([filePath]);
      return from(promise).pipe(map(() => {}));
    }

  RealTime(table : string , filter?  : string) : Observable<any> {
    return new Observable((observer) => {
      const subscription = this.supabase
        .channel(`public:${table}`)
        .on(
          'postgres_changes',
          { 
          event: '*',
          schema: 'public',
          table,
          filter
        },
          (payload) => observer.next(payload)
        )
        .subscribe();

      return () => {
        this.supabase.removeChannel(subscription);
      };
    }).pipe(
    catchError(() => EMPTY)
    );
}
}
