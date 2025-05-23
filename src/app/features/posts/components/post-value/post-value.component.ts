import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-post-value',
  imports: [],
  template: `
  <div (click)="showAllValue.set(!showAllValue())" class="w-full text-sm text-overlay">
    <p [class]="showAllValue() ? '' : 'line-clamp-2'"
    >{{postValue()}}</p>
    </div>
  `,
  styles: ``
})
export class PostValueComponent {
  postValue = input.required<string>();
  showAllValue = signal<boolean>(false);
}
