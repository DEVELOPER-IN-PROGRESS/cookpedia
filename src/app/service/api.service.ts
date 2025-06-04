import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http:HttpClient) { }

  serverUrl = `http://localhost:4000`;

  //api to register
  registerApi(reqBody:any){
    return this.http.post(`${this.serverUrl}/user-register`,reqBody)
  }
}
