import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-profile',
  imports: [HeaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  uploadedImage:string = ''
  downloadedRecipes:any[] = [];
  constructor(private api:ApiService){}

  ngOnInit(){
    this.getAllDownloadedRecipes();
  }

  getAllDownloadedRecipes(){
    this.api.getAllUserDownloadedRecipesApi().subscribe({
      next:(res:any)=>{
        this.downloadedRecipes = res;
        console.log(this.downloadedRecipes);
      },
      error:(err:any)=>{
        console.error(err)
      }
    })
  }


  getFile(e:any){
    console.log(e.target.files[0])

    //file reader
    let fr = new FileReader()
    fr.readAsDataURL(e.target.files[0]) // to read the file and convert to url

    fr.onload = (event:any)=> { //to get the url
      console.log(event.target.result);
      this.uploadedImage = event.target.result;
    }
  }
}
