import { Component } from '@angular/core';
import { WebsocketService } from '../_services/websocket.service';
import { ChatMessage } from '../_interfaces/types';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent {
  friends = [1, 2, 3];
  messages: Array<ChatMessage> = [];
  inputMessage: string = '';

  showChats: boolean = false;

  constructor(
    private webSocketService: WebsocketService,
    private authService: AuthService
  ) {
    this.webSocketService.joinRoom({chatId: '654a438ec235d6d572c90ff3'})
  
    this.webSocketService.newMessageReceived().subscribe((data: any) => {
      this.messages.unshift(data);
    });
  }

  messageClass(userId: String | Number) {
    const cls = ['c-chat-box__message'];

    if (userId == this.authService.getUser()._id) {
      cls.push('c-chat-box__message--self');
    }

    return cls;
  }

  toggleChatBox() {
    console.log('hello')
    this.showChats = !this.showChats;
  }

  onSend() {
    this.webSocketService.sendMessage({
      chatId: '654a438ec235d6d572c90ff3',
      userId: this.authService.getUser()._id,
      text: this.inputMessage
    });

    this.inputMessage = ''
  }
}
