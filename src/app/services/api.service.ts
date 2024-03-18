import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headers:HttpHeaders = new HttpHeaders();

  constructor( private http:HttpClient ) { 
    this.headers.append('Authorization','Bearer '+localStorage.getItem('token'));
  } 

  getCurrentUserNotifications(){
    return this.http.get(environment.apiUrl+'/api/userNotification/notification',{
      headers: this.headers
    })
  }
}
