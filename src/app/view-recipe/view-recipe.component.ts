import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../service/api.service';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'

@Component({
  selector: 'app-view-recipe',
  imports: [HeaderComponent,RouterLink],
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.css'
})
export class ViewRecipeComponent {

  recipeDetails:any = {};
  allRelatedRecipes:any = {};
  ingredients:any = [] //this.recipeDetails.ingredients;
  instructions:any = [] //this.recipeDetails.instructions;

  constructor(private route:ActivatedRoute,private api:ApiService){

  }
  /*activateRoute class is used to access data from the path
   property - params returns observable subscribe partial observable
   partial observable
   -- callback
  */
  ngOnInit(){
    this.route.params.subscribe((res:any)=>{
      // console.log({res});
      this.getViewRecipe(res.id)
    })

  }

  getViewRecipe(id:string){
    this.api.viewRecipeApi(id).subscribe({
      next:(res:any)=>{
        // console.log(res)
        this.recipeDetails = res;
        console.log(this.recipeDetails)
        const { ingredients, instructions } = res;
        console.log(ingredients, instructions )
        this.ingredients = ingredients;
        this.instructions = instructions;
      },
      error:(err:any)=>{
        console.error(err);
      }
    })
  }

  relatedRecipes(cuisine:string){
    this.api.relatedRecipesApi(cuisine).subscribe({
      next:(res:any) => {
        console.log(res);
        this.allRelatedRecipes = res
        // if(res.length){
        //   this.allRelatedRecipes = res.filter( (item:any)=> {
        //     next:(res:any)=>{}
        //   })

        // }
      },
      error:(err:any)=>{
        console.error(err)
      }
    })
  }

  addSaveRecipe(){
    this.api.addSaveRecipesApi(this.recipeDetails._id,this.recipeDetails).
     subscribe({
      next:(res:any)=>{
         console.log(res);
         Swal.fire({
           title:'Aww',
           text:'Recipe saved successfully',
           icon:'success'
         })
      },
      error:(err:any)=>{
        console.error(err)
      }
     })
  }

  addDownloadRecipe(){
    this.generatePdf();

    this.api.downloadRecipeApi(this.recipeDetails._id,this.recipeDetails).subscribe({
      next:(res:any)=>{
         console.log(res);
         Swal.fire({
           title:'Aww',
           text:'Recipe saved successfully',
           icon:'success'
         })
      },
      error:(err:any)=>{
        console.log(err)
        Swal.fire({
           title:'Oops',
           text:'Download Failed',
           icon:'error'
         })
      }
    })

  }
  generatePdf(){
    const pdf = new jsPDF()
    console.log(this.recipeDetails)
    let start:number = 20;
    pdf.setFontSize(16)
    pdf.text(this.recipeDetails.name,10,10)

    pdf.setFontSize(12);
    pdf.text(`cuisine ${this.recipeDetails.cuisine}`, start, 20)
    pdf.text(`Calories Per Serving ${this.recipeDetails.caloriesPerServing}`, start, 25)
    pdf.text(`Cook Time ${this.recipeDetails.cookTimeMinutes}`, start, 30)
    pdf.text(`Mode Of Cooking ${this.recipeDetails.difficulty}`, start, 35);
    pdf.text(`Preparation Time ${this.recipeDetails.prepTimeMinutes}`, start, 40);

    const head = [['Ingredients','Instructions']]
    const body = [[this.recipeDetails.ingredients, this.recipeDetails.instructions]]
    autoTable(pdf , {
       head:head,
      body,
      startY:50
    })
    pdf.output('dataurlnewwindow') // open in new tab
    pdf.save(`${this.recipeDetails.name}.pdf`)
  }
}
