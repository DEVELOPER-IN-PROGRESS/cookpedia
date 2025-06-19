import { Component } from '@angular/core';
import { AdminheaderComponent } from '../adminheader/adminheader.component';
import { AdminsidebarComponent } from '../adminsidebar/adminsidebar.component';
import { ApiService } from '../../service/api.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchPipe } from '../../pipes/search.pipe';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {  OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

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
        serving: ["",[Validators.required,Validators.pattern('[0-9]*')]],
        cookingTime: ["",[Validators.required,Validators.pattern('[0-9]*')]],
        rating: ["",[Validators.required,Validators.pattern('[0-9]*')]],
        modeofCooking: ["",[Validators.required,Validators.pattern('[a-zA-Z]*')]],
        mealType: ["",[Validators.required]],
        cuisineType: ["",[Validators.required]],
        ingredients: ["",[Validators.required]],
        instructions: ["",[Validators.required]],
        image: ["",[Validators.required]],
      })
  }

 ngOnInit(){
    this.dropdownList = [
      { item_id: 10, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      // { item_id: 3, item_text: 'Pune' },
      // { item_id: 4, item_text: 'Navsari' },
      // { item_id: 5, item_text: 'New Delhi' }
    ];

    this.fetchAllRecipes();

    // this.helper();

    this.selectedItems = [
      // { item_id: 1, item_text: 'lunch' },
      // { item_id: 2, item_text: 'dinner' }
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

  helper(){
    // debugger;
    console.log(this.allMealTypes)

    let filtered:any = [];

    this.allMealTypes.map( (item:any,index:number) => filtered.push({'item_id': index+1, 'item_text':item}) )

    console.log({filtered})

    setTimeout(() => {
      this.dropdownList = filtered;
    }, 1000);


    // this.dropdownList = this.allMealTypes?.map( (item:any,index:number) =>{
    //   return {'item_id': index+1, 'item_text':item} } )

    console.log(this.dropdownList)
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
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
