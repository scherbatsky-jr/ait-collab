import { AxiosError, AxiosResponse } from "axios";
import { axiosClient } from "../_axios/axiosClient";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class EventService {
    getAllEvents(): Promise<AxiosResponse> {
        return axiosClient
          .get('/event/all')
          .then((response: AxiosResponse) => {
            return response;
          })
          .catch((error: AxiosError) => {
            throw error;
          });
      }
    
      // Get event by ID
      getEventById(eventId: string): Promise<AxiosResponse> {
        return axiosClient
          .get(`/events/${eventId}`)
          .then((response: AxiosResponse) => {
            return response;
          })
          .catch((error: AxiosError) => {
            throw error;
          });
      }
    
      // Create a new event
      createEvent(eventData: any): Promise<AxiosResponse> {
        return axiosClient
          .post('/event/create', eventData)
          .then((response: AxiosResponse) => {
            return response;
          })
          .catch((error: AxiosError) => {
            throw error;
          });
      }
    
      // Update event by ID
      updateEventById(eventId: string, eventData: any): Promise<AxiosResponse> {
        return axiosClient
          .put(`/event/update/${eventId}`, eventData)
          .then((response: AxiosResponse) => {
            return response;
          })
          .catch((error: AxiosError) => {
            throw error;
          });
      }
    
      // Delete event by ID
      deleteEventById(eventId: string): Promise<AxiosResponse> {
        return axiosClient
          .delete(`/event/delete/${eventId}`)
          .then((response: AxiosResponse) => {
            return response;
          })
          .catch((error: AxiosError) => {
            throw error;
          });
      }
}