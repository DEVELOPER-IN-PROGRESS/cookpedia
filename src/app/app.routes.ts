import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RecipeComponent } from './recipe/recipe.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import { Page404Component } from './page404/page404.component';
import { SavedrecipesComponent } from './savedrecipes/savedrecipes.component';
import { ProfileComponent } from './profile/profile.component';


export const routes: Routes = [
    { path:'',component:HomeComponent },
    { path:'register',component:RegisterComponent },
    { path:'login',component:LoginComponent },
    { path:'all-recipes',component:RecipeComponent },
    { path:'saved-recipes',component:SavedrecipesComponent },
    { path:'profile',component:ProfileComponent },
    { path:'about',component:AboutComponent },
    { path:'contact',component:ContactComponent },
    { path:'view/:id',component:ViewRecipeComponent },
    { path:'**',component:Page404Component },
];
