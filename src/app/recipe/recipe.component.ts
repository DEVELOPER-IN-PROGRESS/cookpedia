import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-recipe',
  imports: [HeaderComponent],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent {
  constructor(private api:ApiService){

  }

  cuisineTypes:any = []
  AllRecipes:any = []
  allMealTypes:any  = []

  ngOnInit(){
    this.getAllRecipes();
  }

  getAllRecipes(){
    this.api.allRecipes().subscribe({
      next: (result:any) => {
        console.log(result)
        this.AllRecipes = result;

        //cuisine and Meal Types
        result.forEach( (item:any) => {

            // console.log(item.mealType)

            !this.cuisineTypes.includes(item.cuisine)
              &&
            this.cuisineTypes.push(item.cuisine)

            item.mealType.forEach( (foodtype:any) =>{
                !this.allMealTypes.includes(foodtype) && this.allMealTypes.push(foodtype)
            })
        })

        console.log(this.cuisineTypes)
        console.log(this.allMealTypes)

      },
      error:(error) => {
        console.log(error)
      }
    })
  }
}
