import { Component, inject, input } from '@angular/core';
import { SharedModule } from '../../../../modules/shared.module';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectQueryParams } from '../../../../../store/routes/router.selectors';
import { map } from 'rxjs';
import { LinkComponent } from "../../../link/link.component";

@Component({
  selector: 'app-edit-header',
  imports: [SharedModule, LinkComponent],
  template :`
    <header class="w-full flex justify-between items-center">
        <h1  class="title-h1  text-center  font-bold">profile {{EditTypeName()}} </h1>
        @if(isCancelUpload()){ 
        <app-link aria-label="edit-profile-image-link" 
        [routerLink]="['/',{outlets : {'profile-setup' : 'user'}}]" 
        [queryParams]="{editType : EditTypeName() === editType() ? null : EditTypeName()}"
        linkClass="link link-hover text-background dark:text-sawa-primary text-lg  capitalize duration-300">
        {{editType() === EditTypeName() ? 'cancel' : 'edit'}}
        </app-link>
        }@else {
        <ng-content select="[cancel-upload]"/>
        }
        
    </header>
  `
})
export class EditHeaderComponent {
  isCancelUpload = input<boolean>(true)
  EditTypeName = input.required<string>();
  readonly store = inject(Store);

  editType = toSignal<string>(
  this.store.select(selectQueryParams).pipe(
  map(params => params['editType'])
  )
  )
}
