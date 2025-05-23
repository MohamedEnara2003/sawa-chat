import { Component, ElementRef, inject, OnInit, signal, viewChild } from '@angular/core';
import { UserStore } from '../../../../store/users/users.signal';
import { PostsStore } from '../../../../store/posts/posts.signal';
import { UserImageComponent } from "../../../../shared/components/user-image/user-image.component";
import { SharedModule } from '../../../../shared/modules/shared.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { postStatus } from '../../../../core/interface/posts';
import { BtnComponent } from "../../../../shared/components/btn/btn.component";
import { LinkComponent } from "../../../../shared/components/link/link.component";

@Component({
  selector: 'app-container-add-post',
  imports: [UserImageComponent, SharedModule, BtnComponent, LinkComponent],
  template : `
  <section class="w-full fixed flex justify-center items-center z-100">

  <div class="w-full  lg:w-[45%] h-[75vh] overflow-y-auto flex flex-col justify-start  gap-4 z-100
  items-center bg-tint rounded-2xl border-2 border-background p-4  animate-up"
  style="scrollbar-width: none;">

  <header class="w-full border-b-1 border-b-background flex justify-between items-center pb-2
  capitalize">
  <app-link aria-label="close-create-post" (click)="closeModle()">
  <i class="fa-solid fa-close text-xl btn-hover text-white"></i>
  </app-link>

  <h1 class="title-h1">{{postsStore.post() ? 'edit post' : 'create post'}} </h1>
  
  <app-btn (click)="createAndEditPost()" btnType="button" 
  [disabled]="form.invalid && !postsStore.file_url()"
  aria-label="Submit post"
  btnClass="btn btn-sm bg-sawa-primary text-background">
  Post
  </app-btn>
  </header>

  <div class="w-full flex flex-wrap justify-between items-start  px-2">
  <div class="flex  justify-start gap-2">
  <picture  class="size-8 rounded-full ">
  <app-user-image imageClass="size-full object-cover rounded-full"/>
  </picture>
  <h1 class="capitalize title-h1 text-base">{{userStore.user()?.fullName}}</h1>
  </div>

  <label class="select select-neutral select-xs  w-30 bg-background" >
    <span class="label" >
    <i class="fa-solid  text-overlay" [ngClass]="{
    'fa-earth-americas' : postPrivacy() === 'public' ,
    'fa-users' : postPrivacy() === 'followers' ,
    'fa-lock' : postPrivacy() === 'privacy' ,
    }"></i>
    </span>
    <select [ngModel]="postPrivacy()" (ngModelChange)="postPrivacy.set($event)" 
    name="postPrivacy" class="focus:outline-none  text-white">
    <option value="public">Public</option>
    <option value="followers">followers</option>
  </select>
  </label>

  </div>

  <form [formGroup]="form" class="w-full h-full  flex flex-col justify-between items-center">
    
  <div class="w-full  overflow-hidden duration-200 "
  [ngClass]="postsStore.file_url() === '' ? 'h-40' : ''">
  <textarea #postContentRef  aria-label="post-feild" name="post-feild" formControlName="postContent"
  placeholder="Tell your friends about your thoughts.." 
  class="textarea size-full  rounded-box bg-background placeholder:text-overlay 
  border-transparent focus:outline-none text-white text-sm">
  </textarea>
  </div>

  @if(postsStore.previewUrl() === ''){ 
  <div class="w-full h-30 bg-[#333] rounded-t-2xl">
  <app-btn btnType="button" btnClass="w-full text-center capitalize">
            <label for="upload" class="w-[90%] mt-5  btn-ghost  btn bg-tint text-sawa-primary">
            <i class="fa-solid fa-plus"></i> Add photo
            <input (change)="uploadImage($event)"
            type="file" name="upload" id="upload"  accept="image/*" 
            class="hidden">
            </label>
      </app-btn>
  </div>
}@else {
<picture aria-label="uploaded-image" class="relative w-full h-[80%] bg-background">
  @if(!postsStore.isLoadingUpload()){ 
  <img [src]="postsStore.previewUrl()" alt="uploaded-image" class="size-full object-cover">
  <app-btn btnType="button"  (click)="postsStore.removeUploadedImage()"
  aria-label="Remove uploaded image"
  btnClass="absolute right-2 top-2 size-8 bg-background rounded-full text-center 
  hover:opacity-70 duration-300 cursor-pointer shadow-md shadow-background">
  <i class="fa-solid fa-trash-can text-sawa-primary text-lg"></i>
  </app-btn>
  }@else {
  <div class="w-full h-full bg-overlay animate-pulse"></div>
  }
</picture>
}
</form>

  </div>
  <div (click)="closeModle()"  class="w-full h-screen bg-background opacity-50  fixed top-0 left-0 z-50">
  </div>
  </section>
  `,
})
export class ContainerAddPostComponent implements OnInit{
  readonly router = inject(Router);
  readonly userStore = inject(UserStore);
  readonly postsStore = inject(PostsStore);

  form: FormGroup 
  postContentRef = viewChild<ElementRef<HTMLElement>>('postContentRef')
  postPrivacy = signal<postStatus>(this.postsStore.post()?.privacy || 'public')

  ngOnInit(): void {
  this.postContentRef()?.nativeElement.focus();
  this.form = new FormGroup({
  postContent: new FormControl(this.postsStore.post()?.value || '' , Validators.required),
  })
  }

  uploadImage(event : Event) : void {
  const files = (event.target as HTMLInputElement).files;
  if(files && files.length > 0){
  const file = files[0];
  this.postsStore.uploadImage(file);
  }
  }

  createAndEditPost() : void {
  const value = this.form.getRawValue();
  if(this.form.valid || this.postsStore.file_url()){
  if(this.postsStore.post() === undefined){
  this.postsStore.createPost(value.postContent , this.postPrivacy());
  }else{
  this.postsStore.editPost(value.postContent , this.postPrivacy())
  }
  this.router.navigate(['/',{outlets : {primary : ['home' , this.postPrivacy()], 'container':null}}]);
  }
  }

  closeModle() : void {
  this.router.navigate(['/',{outlets : {'container':null}}]);
  if(this.postsStore.post()){
  this.postsStore.closeModlePostEdit();
  }else{
  this.postsStore.removeUploadedImage();
  }
  }

}
