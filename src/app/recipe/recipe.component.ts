import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ApiService } from '../service/api.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../pipes/search.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-recipe',
  imports: [HeaderComponent,DatePipe,FormsModule,SearchPipe,NgxPaginationModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent {
  constructor(private api:ApiService){
  }

  p:number = 1
  time:Date = new Date()
  searchKey:string = ''
  cuisineTypes:any = []
  AllRecipes:any = []
  allMealTypes:any  = []
  dummyArray:any = []

  ngOnInit(){
    this.getAllRecipes();
  }

  getAllRecipes(){
    this.api.allRecipes().subscribe({
      next: (result:any) => {
        console.log(result)
        this.AllRecipes = result;
        this.dummyArray = result;
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

  filterCuisine(item:any){
    console.log(item);
    this.AllRecipes = this.dummyArray.filter( (recipe:any) => recipe.cuisine == item )
  }

  filterMeals(item:any){
    this.AllRecipes = this.dummyArray.filter( (recipe:any) =>
       recipe.mealType.includes(item) )
  }

  viewallMeals(){
    this.AllRecipes = this.dummyArray;
  }
}
