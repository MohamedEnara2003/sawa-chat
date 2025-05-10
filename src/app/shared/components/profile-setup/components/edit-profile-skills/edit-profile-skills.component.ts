import { Component, inject, input, OnInit, signal } from '@angular/core';
import { SharedModule } from '../../../../modules/shared.module';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileSkillsComponent } from "../../../profile-aside/components/profile-skills/profile-skills.component";
import { EditHeaderComponent } from "../edit-header/edit-header.component";
import { UserStore } from '../../../../../store/users/users.signal';
import { BtnComponent } from "../../../btn/btn.component";

@Component({
  selector: 'app-edit-profile-skills',
  imports: [SharedModule, ProfileSkillsComponent, EditHeaderComponent, BtnComponent],
  templateUrl: './edit-profile-skills.component.html',
  styles: ``
})
export class EditProfileSkillsComponent implements OnInit{
  readonly  userStore = inject(UserStore);
  form : FormGroup;

  editType = input.required<string>();

  get skillsValues() : FormArray{
  return this.form.get('skills') as FormArray
  }
  
  skills = signal<string[]>([]);
  skillsValidators = [Validators.required , Validators.minLength(5) , Validators.maxLength(50)] ;
  constructor(private fb : FormBuilder){}

  ngOnInit(): void {
  this.initFormGroup();
  }
  
  addSkill () : void {
  this.skillsValues.push(this.createSkill(''));
  }

  removeSkill (i : number) : void {
  this.skillsValues.removeAt(i) ;
  } 

  private initFormGroup() : void {
  this.form = this.fb.group({
  skills : this.fb.array([])
  });
  
  const existingSkills =  this.userStore.user()?.skills ;
  if(existingSkills){
    existingSkills.map((skill) => {
      this.skillsValues.push(this.createSkill(skill));
    });
  }
  }
  
  onSave () : void {
  const skillsControlValue = this.form.controls['skills'].value || [];
  const skills: string[] = Array.isArray(skillsControlValue)
    ? skillsControlValue
        .map((skills: { skill: string }) => skills.skill.trim())
        .filter((skill: string) => skill?.length > 2)
    : [];
  const uniqueSkills = Array.from(new Set(skills));
  this.userStore.editSkills(uniqueSkills);
  }
  
  private createSkill (value : string) : FormGroup {
  return  this.fb.group({
    skill : [value , {validators : this.skillsValidators}]
  })
  } 
}
