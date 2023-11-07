import { Component } from '@angular/core';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent {
  friends = [1, 2, 3];
  messages = [
    {
      text: "hello",
      self: true
    },
    {
      text: "hello",
      self: false
    },
    {
      text: "hello",
      self: true
    },
    {
      text: "hello",
      self: true
    },
    {
      text: "hello",
      self: false
    },
    {
      text: "hello",
      self: true
    },
    {
      text: "hello",
      self: false
    },
    {
      text: "hello",
      self: false
    },
    {
      text: "hello",
      self: false
    },
    {
      text: "hello",
      self: false
    },
  ];
  inputMessage: string = '';

  showChats: boolean = false;

  messageClass(self: boolean) {
    const cls = ['c-chat-box__message'];

    if (self) {
      cls.push('c-chat-box__message--self');
    }

    return cls;
  }

  toggleChatBox() {
    console.log('hello')
    this.showChats = !this.showChats;
  }

  onSend() {
    this.messages.unshift({
      text: this.inputMessage,
      self: true
    });

    this.inputMessage = ''
  }
}
