]import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http:HttpClient) { }

  serverUrl = `https://cookpedia-backend-d260.onrender.com`;

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

  appendToken(){
    let headers = new HttpHeaders();
    const token = sessionStorage.getItem('token')
    console.log(token)

    if(token){
      headers = headers.append('Authorization',`Bearer ${token}`)
    }
    return {headers};
  }

  //api to view a recipe
  viewRecipeApi(id:string){
    return this.http.get(`${this.serverUrl}/view/${id}`,this.appendToken())
  }

  //api to view related recipes
   relatedRecipesApi(cuisine:any){
    return this.http.get(`${this.serverUrl}/related-recipes?cuisine=${cuisine}`, this.appendToken() )
   }

   //add - save recipe
   addSaveRecipesApi(recipeid:any,reqBody:any){
    return this.http.post(`${this.serverUrl}/save-recipe/${recipeid}`,reqBody, this.appendToken())
   }

  downloadRecipeApi(recipeId:any,reqBody:any){
    return this.http.post(`${this.serverUrl}/download-recipe/${recipeId}`,reqBody,this.appendToken())
  }

  // api to get all the saved user recipes
  getAllUSerSavedRecipesApi(){
    return this.http.get(`${this.serverUrl}/saved-user-recipes`,this.appendToken());
  }

  //api to delete a single saved recipe
  deleteUserSavedRecipeApi(id:any){
    return this.http.delete(`${this.serverUrl}/delete-saved-recipe/${id}`)
  }

  // get all the downloaded recipes list
  getAllUserDownloadedRecipesApi(){
    return this.http.get(`${this.serverUrl}/downloaded-user-recipes`,this.appendToken());
  }

  //api to update the profile
  updateProfileApi(reqBody:any){
    return this.http.put(`${this.serverUrl}/profile-update`,reqBody,this.appendToken())
  }

  //get all the users list
  getAllUsersApi(){
    return this.http.get(`${this.serverUrl}/all-users`);
  }

  getAllDownloads(){
    return this.http.get(`${this.serverUrl}/all-downloads`)
  }

  addNewRecipeApi(reqBody:any){
    return this.http.post(`${this.serverUrl}/add-recipe`,reqBody)
  }

  addNewTestimonialApi(reqBody:any){
    return this.http.post(`${this.serverUrl}/add-testimonial`,reqBody);
  }

  //api to get all the testimonials
  getAllTestimonialsApi(){
    return this.http.get(`${this.serverUrl}/all-testimonials`)
  }

  updateTestimonialStatusApi(id:any,reqBody:any){
    return this.http.put(`${this.serverUrl}/update-testimonial/${id}`,reqBody);
  }
}
