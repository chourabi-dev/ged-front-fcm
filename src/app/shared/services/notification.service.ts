import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_ENDPOINT } from '@app/configs/app.config';

import Notification from '../types/notification.interface';
import { environment } from 'src/environments/environment';
 
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
/**
 *   notificationUrl = `${API_ENDPOINT}/notification`;

  constructor(private http: HttpClient) {}

  public () {
    return this.http.get<Array<Notification>>(this.notificationUrl);
  }

 */
 
  constructor( private http:HttpClient ) { 
     
  } 

  getNotificationList(){
    const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer '+localStorage.getItem('token'));

    return this.http.get(environment.apiUrl+'/api/userNotification/notification',{
      headers: headers
    })
  }
}