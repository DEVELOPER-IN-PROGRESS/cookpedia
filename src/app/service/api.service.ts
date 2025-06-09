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

  //login api
  userLoginApi(reqBody:any){
    return this.http.post(`${this.serverUrl}/user-login`,reqBody)
  }

  //api to get all home recipes
  homeRecipeApi(){
    return this.http.get(`${this.serverUrl}/home-recipes`)
  }

  //api to fetch all the recipes
  allRecipes(){
    return this.http.get(`${this.serverUrl}/all-recipes`)
  }
}
