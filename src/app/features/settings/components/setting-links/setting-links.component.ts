import { Component, signal } from '@angular/core';
import { LinksType } from '../../../../shared/interfaces/links';

@Component({
  selector: 'app-setting-links',
  imports: [],
  templateUrl: './setting-links.component.html',
  styleUrl: './setting-links.component.css'
})
export class SettingLinksComponent {
  settingLinks = signal<LinksType[]>([
  {id :1 , linkName : 'Account' , iconName : 'fa-solid fa-circle-user'} ,
  {id :1 , linkName : 'Apps and website' , iconName : ''} ,
  {id :1 , linkName : 'Change Password' , iconName : 'fa-solid fa-kay'} ,
  {id :1 , linkName : 'Activity log' , iconName : 'fa-solid fa-circle-user'} ,
  {id :1 , linkName : 'Privacy and Security' , iconName : 'fa-solid fa-circle-user'} ,
  {id :1 , linkName : 'Others' , iconName : 'fa-solid fa-circle-user'} ,
  {id :1 , linkName : 'Log Out' , iconName : 'fa-solid fa-circle-user'} ,
  ]).asReadonly();


  
}
