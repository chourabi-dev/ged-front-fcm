import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private http:HttpClient) { }

  auth(user: any){ 
      return this.http.post<any>(environment.apiUrl+'/api/auth/login',user);
  }

}
