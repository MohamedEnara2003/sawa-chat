import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

@Injectable({
  providedIn: 'root'
})
export class DayJsService {
  constructor(){
      dayjs.extend(relativeTime);
  }

    formatTime(timestamp: string): string {
      return dayjs(timestamp).fromNow(); 
    }

}
