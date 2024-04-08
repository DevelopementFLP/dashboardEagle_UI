import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EagleResponse } from '../../model/EagleResponse.interface';
import { environments } from '../../environments/environments.development';

@Injectable({providedIn: 'root'})
export class ApiService {
    
    constructor(private http: HttpClient) { }
    
    getAll(date: string, headers: HttpHeaders) : Observable<EagleResponse> {
        return this.http.get<EagleResponse>(`${environments.baseUrl}/EagleResponse/GetAll?date=${date}`, {headers});
    }
}