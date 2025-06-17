import { Component } from '@angular/core';
import { AdminheaderComponent } from '../adminheader/adminheader.component';
import { AdminsidebarComponent } from '../adminsidebar/adminsidebar.component';
import { ApiService } from '../../service/api.service';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../pipes/search.pipe';

@Component({
  selector: 'app-adminrecipes',
  imports: [AdminheaderComponent,AdminsidebarComponent,FormsModule, SearchPipe],
  templateUrl: './adminrecipes.component.html',
  styleUrl: './adminrecipes.component.css'
})
export class AdminrecipesComponent {

  allRecipes:any =[];
  searchKey:string = "";
  cuisineTypes:any = []
  allMealTypes:any  = []

  constructor(private api:ApiService) {}

 ngOnInit(){
    this.fetchAllRecipes()
 }

 fetchAllRecipes(){
  this.api.allRecipes().subscribe({
    next: (res:any) => {
      console.log(res);
      this.allRecipes = res;

      res.forEach( (item:any) => {
            // console.log(item.mealType)
            !this.cuisineTypes.includes(item.cuisine)
              &&
            this.cuisineTypes.push(item.cuisine)

            item.mealType.forEach( (foodtype:any) =>{
                !this.allMealTypes.includes(foodtype) && this.allMealTypes.push(foodtype)
            })
        })
        console.log(this.cuisineTypes, this.allMealTypes)
    },
    error:(err:any)=>{
      console.log(err)
    }
  })
 }
}
