import { Component } from '@angular/core';
import { AdminheaderComponent } from '../adminheader/adminheader.component';
import { AdminsidebarComponent } from '../adminsidebar/adminsidebar.component';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-adminhome',
  imports: [AdminheaderComponent,AdminsidebarComponent],
  templateUrl: './adminhome.component.html',
  styleUrl: './adminhome.component.css'
})
export class AdminhomeComponent {
  downloadCount:number = 0
  userCount:number = 0
  recipeCount:number = 0
  notificationCount:number  = 0
  constructor(private api:ApiService){}

  ngOnInit(){
    this.bootSequence();
  }

  bootSequence(){
    this.api.getAllDownloads().subscribe({
      next:(res:any)=> { this.downloadCount = res.length},
      error:(err:any) => console.log(err)
    })

    this.api.getAllUsersApi().subscribe({
      next:(res:any)=> { this.userCount = res.length},
      error:(err:any) => console.log(err)
    })

    this.api.allRecipes()
    .subscribe({
      next:(res:any)=> { this.recipeCount = res.length},
      error:(err:any) => console.log(err)
    })

  }
}
