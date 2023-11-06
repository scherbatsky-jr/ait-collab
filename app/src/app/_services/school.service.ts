import { AxiosError, AxiosResponse } from "axios";
import { axiosClient } from "../_axios/axiosClient";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class SchoolService {
    fetchSchools(): Promise<AxiosResponse> {
        return axiosClient
            .get('/school/all')
            .then((response: AxiosResponse) => {
                localStorage.setItem('schools', JSON.stringify(response.data))    
                return response;
            })
            .catch((error: AxiosError) => {
                throw error;
            })
    }

    getSchools() {
        if (localStorage.getItem('schools')) {
            return JSON.parse(localStorage.getItem('schools') as string)
        }
        
        return [];
    }
}