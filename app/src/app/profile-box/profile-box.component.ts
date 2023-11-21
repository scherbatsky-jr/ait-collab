import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ChatService } from '../_services/chat.service';

@Component({
  selector: 'app-profile-box',
  template: '<p>{{ user }}</p>',
  templateUrl: './profile-box.component.html',
  styleUrls: ['./profile-box.component.scss']
})
export class ProfileBoxComponent {
  @Input() user: any;
  @Input() userType: string = 'mentor'

  @Output() sendRequest = new EventEmitter<string>()
  @Output() acceptRequest = new EventEmitter<string>()

  constructor(private chatService: ChatService) {}

  onClickButton () {
    if (this.userType == 'suggestion') {
      this.sendRequest.emit(this.user._id)
    } else if (this.userType == 'mentor') {
      this.chatService.toggleChatbox(true);
    } else {
      this.acceptRequest.emit(this.user._id)
    }
  }

  getButtonLabel() {
    switch (this.userType) {
      case 'mentor':
        return 'Chat'
        break
      case 'suggestion':
        return 'Connect'
        break
      default:
        return 'Accept'
    }
  }
}
