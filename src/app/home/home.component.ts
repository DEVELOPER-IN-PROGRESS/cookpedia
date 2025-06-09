import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterLink } from '@angular/router';
import { ApiService } from '../service/api.service';
@Component({
  selector: 'app-home',
  imports: [HeaderComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

   HomeRecipe:any = []

  constructor(private api:ApiService){

  }

  ngOnInit(){
    this.getAllHomeRecipes()
  }

  getAllHomeRecipes(){
      this.api.homeRecipeApi().subscribe({
        next: (result:any) => {
            this.HomeRecipe = result
        },
        error: (error) => {
          console.log(`Error ${error}`)
        }
      })
  }

}
