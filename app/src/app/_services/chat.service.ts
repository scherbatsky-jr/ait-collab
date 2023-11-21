import { AxiosError, AxiosResponse } from "axios";
import { axiosClient } from "../_axios/axiosClient";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    private chatboxToggleSubject = new Subject<boolean>();

    chatboxToggle$ = this.chatboxToggleSubject.asObservable();

    toggleChatbox(open: boolean): void {
      this.chatboxToggleSubject.next(open);
    }

    getChatIds(): Promise<AxiosResponse> {
        return axiosClient
            .get('/chat/ids')
            .then((response: AxiosResponse) => { 
                return response;
            })
            .catch((error: AxiosError) => {
                throw error;
            })
    }

    getChatMessages(chatId: string): Promise<AxiosResponse> {
        return axiosClient
            .post('/chat/messages', { chatId: chatId })
            .then((response: AxiosResponse) => { 
                return response;
            })
            .catch((error: AxiosError) => {
                throw error;
            })
    }
}