import { AxiosError, AxiosResponse } from "axios";
import { axiosClient } from "../_axios/axiosClient";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class ChatService {
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