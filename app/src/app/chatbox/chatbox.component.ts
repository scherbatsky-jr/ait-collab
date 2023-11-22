import { Component } from '@angular/core';
import { WebsocketService } from '../_services/websocket.service';
import { ChatMessage } from '../_interfaces/types';
import { AuthService } from '../_services/auth.service';
import { ChatService } from '../_services/chat.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent {
  chatIds: Array<any> = [];
  messages: Array<ChatMessage> = [];
  inputMessage: string = '';
  currentChatId: string = '';
  currentChat: any;

  showChats: boolean = false;
  showChatBox: boolean = false;
  showChatMessages: boolean = false;

  private subscription: Subscription;

  constructor(
    private webSocketService: WebsocketService,
    private authService: AuthService,
    private chatService: ChatService
  ) {
    this.subscription = this.chatService.chatboxToggle$.subscribe(open => {
      this.showChats = open;
    });
  }

  ngOnInit() {
    this.chatService.getChatIds()
      .then(response => {
        this.chatIds = response.data

        this.currentChat = this.chatIds[0]

        this.chatService.getChatMessages(this.currentChat.id)
          .then((response) => {
            this.messages = response.data;
          })

        this.webSocketService.joinRoom({chatId: this.currentChat.id})
      
        this.webSocketService.newMessageReceived().subscribe((data: any) => {
          this.messages.unshift(data);
        });
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
    this.showChats = !this.showChats;
  }

  toggleChatBoxMessage() {
    this.showChatMessages = !this.showChatMessages
  }

  onChatClick(chat: any) {
    this.chatService.getChatMessages(chat.id)
      .then((response) => {
        this.currentChat = chat
        this.messages = response.data;

        this.webSocketService.joinRoom({chatId: this.currentChat.id})

        this.showChatBox = true
        this.showChatMessages = true
      })
  }

  onSend() {
    this.webSocketService.sendMessage({
      chatId: this.currentChat.id,
      userId: this.authService.getUser()._id,
      message: this.inputMessage
    });

    this.inputMessage = ''
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
