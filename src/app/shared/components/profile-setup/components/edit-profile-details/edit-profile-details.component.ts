import { Component, inject, input, OnInit } from '@angular/core';
import { SharedModule } from '../../../../modules/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userDetails } from '../../../../../core/interface/user';
import { ProfileDetailsComponent } from "../../../profile-aside/components/profile-details/profile-details.component";
import { EditHeaderComponent } from "../edit-header/edit-header.component";
import { UserStore } from '../../../../../store/users/users.signal';

@Component({
  selector: 'app-edit-profile-details',
  imports: [SharedModule, ProfileDetailsComponent, EditHeaderComponent],
  templateUrl: './edit-profile-details.component.html',
  styles: ``
})
export class EditProfileDetailsComponent implements OnInit{
  readonly userStore = inject(UserStore);
  editType = input.required<string>();
  form : FormGroup ;

  constructor(
  private fb : FormBuilder
  ){}
  
  ngOnInit(): void {
  this.initFormGroup();
  }
  
  private initFormGroup () : void {
  const details = this.userStore.user()?.details;
  this.form = this.fb.group({
    gender : [details?.gender || '', {validators: [Validators.required]}],
    work :   [details?.work || '', {validators: [Validators.required]}],
    address :[details?.address || '', {validators: [Validators.required]}],
  });
  }
  
  onSubmit() : void {
  if(this.form.valid){
    const value = this.form.getRawValue();
    const userDetails : userDetails = {
    gender : value.gender ,
    work : value.work ,
    address : value.address
  }
  this.userStore.editDetails(userDetails);
  }
  }
}
