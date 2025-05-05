import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocaleStorgeService {

  setItem(key: string, value: string) : void {
  localStorage.setItem(key , value) ;
  }

  getItem(key: string) : string {
  return localStorage.getItem(key)! ;
  }
  
}
