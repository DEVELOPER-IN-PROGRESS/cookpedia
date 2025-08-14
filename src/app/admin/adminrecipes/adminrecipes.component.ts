import { Component, ComponentFactoryResolver } from '@angular/core';
import { AdminheaderComponent } from '../adminheader/adminheader.component';
import { AdminsidebarComponent } from '../adminsidebar/adminsidebar.component';
import { ApiService } from '../../service/api.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchPipe } from '../../pipes/search.pipe';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {  OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminrecipes',
  imports: [AdminheaderComponent,AdminsidebarComponent,
    FormsModule, SearchPipe,NgMultiSelectDropDownModule, ReactiveFormsModule],
  templateUrl: './adminrecipes.component.html',
  styleUrl: './adminrecipes.component.css'
})
export class AdminrecipesComponent {

  allRecipes:any =[];
  searchKey:string = "";
  cuisineTypes:any = []
  allMealTypes:any  = []

  dropdownList:any = [];
  selectedItems:any = [];
  dropdownSettings:IDropdownSettings = {};
  recipeForm: FormGroup

  constructor(private api:ApiService , private fb:FormBuilder) {

      this.recipeForm = fb.group({
        recipeName: ["",[Validators.required,Validators.pattern('[a-zA-Z]*')]],
        prepTime: ["",[Validators.required,Validators.pattern('[0-9]*')]],
        calories: ["",[Validators.required,Validators.pattern('[0-9]*')]],
        servings: ["",[Validators.required,Validators.pattern('[0-9]*')]],
        cookingTime: ["",[Validators.required,Validators.pattern('[0-9]*')]],
        rating: ["",[Validators.required,Validators.pattern('[0-9]*')]],
        modeofCooking: ["",[Validators.required,Validators.pattern('[a-zA-Z]*')]],
        mealType: [[],[Validators.required]],
        cuisineType: ["",[Validators.required]],
        ingredients: [[],[Validators.required]],
        instructions: [[],[Validators.required]],
        image: ["",[Validators.required]],
      })
  }

 ngOnInit(){
    this.dropdownList = [
      { item_id: 1, item_text: 'Dinner'},
      { item_id: 2, item_text: 'Lunch' },
      { item_id: 3, item_text: 'Breakfast'},
      { item_id: 4, item_text: 'Dessert'},
      { item_id: 5, item_text: 'Side Dish'},
      { item_id: 6, item_text: 'Appetizer' },
      { item_id: 7, item_text: 'Snacks' },
      { item_id: 8, item_text:  'Beverage' },
    ];

    this.fetchAllRecipes();

    // this.helper();

    this.selectedItems = [
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    // this.helper();

    console.log(this.dropdownList)

  }

  save(){
    console.log('inside save function')
    console.log(this.recipeForm.value)
    const { recipeName,prepTime,calories,servings,cookingTime, rating,modeofCooking,mealType,cuisineType,ingredients,instructions,image } = this.recipeForm.value;
    if( !recipeName || !prepTime || !calories || !servings || !cookingTime || ! rating || !modeofCooking || !mealType || !cuisineType || !ingredients.length || !instructions.length || !image){
      Swal.fire({
        title: 'OOps',
        text: 'Please Fill the complete form',
        icon: 'info'
      })
    }else{
      this.api.addNewRecipeApi(this.recipeForm.value).subscribe({
        next:(res:any)=>{
          console.log(res)
        },
        error:(err:any)=>{
          console.log(err);
        }
      })
    }
  }

  deleteReceipe(id:any){
    this.api.deleteUserSavedRecipeApi(id).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.fetchAllRecipes();
      },
      error:(res:any)=> console.log(res)
    })
  }

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.recipeForm.value)
    this.recipeForm.value.mealType.push(item.item_text)
  }

  onSelectAll(items: any) {
    console.log(items);
    items.forEach((item:any) =>{
      this.recipeForm.value.mealType.push(item.item_text);
    })
  }

  onDeleteItem(items:any){
    console.log(items)
    this.recipeForm.value.mealType = this.recipeForm.value.mealType
    .filter((meal:any)=> meal != items.item_text)
  }

  onDeleteItemall(){
    this.recipeForm.value.mealType = [];
  }

  addIngredient(data:any){
    console.log(data.value)
    this.recipeForm.value.ingredients.push(data.value)
    data.value = ''
  }

  addInstruction(data:any){
    console.log(data.value)

    console.log( this.recipeForm.value.instructions)
    this.recipeForm.value.instructions.push(data.value)
    data.value = ''
  }

   getFile(e:any){
    console.log(e.target.files[0])

    //file reader
    let fr = new FileReader()
    fr.readAsDataURL(e.target.files[0]) // to read the file and convert to url

    fr.onload = (event:any)=> {
      this.recipeForm.value.image = event.target.result;
    }
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
        console.log('here',this.allMealTypes)
    },
    error:(err:any)=>{
      console.log(err)
    }
  })
 }
}
