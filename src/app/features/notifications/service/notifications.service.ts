import { inject, Injectable } from '@angular/core';
import { SingleTonApiService } from '../../../core/services/single-ton-api.service';
import { from, map, Observable } from 'rxjs';
import { Notifications } from '../../../core/interface/notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private readonly tableName : string = 'notifications';
  private readonly singleTonApi = inject(SingleTonApiService);
  
  addNotification(notification : Notifications) : Observable<Notifications>{
  return this.singleTonApi.insert(this.tableName , notification);
  }
  
  removeNotification(id : number) : Observable<void> {
  return this.singleTonApi.delete(this.tableName , {id});
  }

  getNotifications(user_id : string) : Observable<Notifications[]> {
  const promise = this.singleTonApi.supabase.from(this.tableName)
  .select('*')
  .match({to_user_id : user_id})
  return from(promise).pipe(map((res) => res.data || []))
  }

  listenForNotifications() : Observable<any> {
  return this.singleTonApi.RealTime(this.tableName);
  }
}
