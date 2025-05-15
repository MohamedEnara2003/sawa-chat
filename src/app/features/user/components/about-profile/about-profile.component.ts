import { Component, inject } from '@angular/core';
import { UserStore } from '../../../../store/users/users.signal';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { ProfileSkillsComponent } from "../../../../shared/components/profile-aside/components/profile-skills/profile-skills.component";
import { ProfileDetailsComponent } from "../../../../shared/components/profile-aside/components/profile-details/profile-details.component";

@Component({
  selector: 'app-about-profile',
  imports: [SharedModule, ProfileSkillsComponent, ProfileDetailsComponent],
  template: `
    <section class="size-full flex flex-col justify-center gap-5" aria-label="User profile information">
      <h2 class="text-2xl font-semibold text-white" id="about-heading">About</h2>
      
      @if (!userStore.userProfile()) {
        <p class="text-sawa-primary" role="status">No profile information available!</p>
      } @else {
        @let bio = userStore.userProfile()?.bio;
        @if (bio) {
          <article class="flex flex-col gap-2">
            <h3 class="text-lg font-medium text-white" id="bio-heading">Bio</h3>
            <p class="text-gray-300" aria-labelledby="bio-heading">{{bio}}</p>
          </article>
        }
        @let details = userStore.userProfile()?.details;
        @if (details) {
          <article class="flex flex-col gap-2">
            <h3 class="text-lg font-medium text-white" id="details-heading">Details</h3>
            <div class="flex flex-col gap-1" aria-labelledby="details-heading">
              <app-profile-details [details]="details"/>
            </div>
          </article>
        }
        @let skills = userStore.userProfile()?.skills!;
        @if (skills.length >= 1) {
          <article class="flex flex-col gap-2">
            <h3 class="text-lg font-medium text-white" id="skills-heading">Skills</h3>
            <div class="flex flex-wrap gap-2" aria-labelledby="skills-heading">
              <app-profile-skills class="w-full" [skills]="skills" />
            </div>
          </article>
        }

        <article class="flex flex-col gap-2">
          <h3 class="text-lg font-medium text-white" id="contact-heading">Contact Information</h3>
          <div class="flex flex-col gap-1" aria-labelledby="contact-heading">
            @if (userStore.userProfile()?.email) {
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-envelope text-sawa-primary" aria-hidden="true"></i>
                <span class="text-gray-300">{{ userStore.userProfile()?.email }}</span>
              </div>
            }
            @if (userStore.userProfile()?.phone_number) {
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-phone text-sawa-primary" aria-hidden="true"></i>
                <span class="text-gray-300">{{ userStore.userProfile()?.phone_number }}</span>
              </div>
            }
          </div>
        </article>
      }
    </section>
  `,
  styles: ``
})
export class AboutProfileComponent {
  readonly userStore = inject(UserStore);
}
