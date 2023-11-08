import { Component } from '@angular/core';
import { WebsocketService } from '../_services/websocket.service';
import { ChatMessage } from '../_interfaces/types';
import { AuthService } from '../_services/auth.service';
import { ChatService } from '../_services/chat.service';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent {
  chatIds: Array<string> = [];
  messages: Array<ChatMessage> = [];
  inputMessage: string = '';
  currentChatId: string = '';

  showChats: boolean = false;

  constructor(
    private webSocketService: WebsocketService,
    private authService: AuthService,
    private chatService: ChatService
  ) {
    this.webSocketService.joinRoom({chatId: '654a438ec235d6d572c90ff3'})
  
    this.webSocketService.newMessageReceived().subscribe((data: any) => {
      this.messages.unshift(data);
    });
  }

  ngOnInit() {
    this.chatService.getChatIds()
      .then(response => {
        this.chatIds = response.data
      })
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

  onChatClick(id: string) {
    this.chatService.getChatMessages(id)
      .then((response) => {
        this.currentChatId = id;
        this.messages = response.data;
      })
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
