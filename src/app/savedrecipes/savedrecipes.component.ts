import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ApiService } from '../service/api.service';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-savedrecipes',
  imports: [HeaderComponent,RouterLink],
  templateUrl: './savedrecipes.component.html',
  styleUrl: './savedrecipes.component.css'
})
export class SavedrecipesComponent {

 allSavedRecipes:any[] = [];
 constructor(private api:ApiService,private router:Router){}

 ngOnInit(){
    this.getAllUserSavedRecipe();
  }

 getAllUserSavedRecipe(){
   this.api.getAllUSerSavedRecipesApi().subscribe({
      next:(res:any)=>{
        console.log(res)
        this.allSavedRecipes = res;

      },
      error:(error:any)=>{console.error(error)}
   })
 }

 viewRecipe(id:string){
      const token = sessionStorage.getItem('token');
      if(token){
       this.router.navigateByUrl(`/view/${id}`)
      }else{
       Swal.fire({
         icon:'info',
         title:'',
       })
       this.router.navigateByUrl('/login')
      }
   }

   deleteRecipe(id:any){
     this.api.deleteUserSavedRecipeApi(id).subscribe({
      next:(res)=>{
        console.log(res)
       this.getAllUserSavedRecipe()
      },
      error:(err)=>console.error(err)
     })
   }
}
