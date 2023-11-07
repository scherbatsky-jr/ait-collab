import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-box',
  template: '<p>{{ user }}</p>',
  templateUrl: './profile-box.component.html',
  styleUrls: ['./profile-box.component.scss']
})
export class ProfileBoxComponent {
  @Input() user: any;
  @Input() isSuggestion: boolean = false;
}
