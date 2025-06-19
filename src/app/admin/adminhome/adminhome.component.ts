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
      next:(res:any)=> {
        console.log(res)
        let count = res.map((item:any) => item.count )
        console.log(count)
         this.downloadCount = res.map((item:any) => item.count)
        .reduce( (n1:any,n2:any) => n1+n2  )
       },
      error:(err:any) => console.log(err)
    })

    this.api.getAllUsersApi().subscribe({
      next:(res:any)=> {
        this.userCount = res.filter((user:any) => user.role!="admin").length;
      },
      error:(err:any) => console.log(err)
    })

    this.api.allRecipes()
    .subscribe({
      next:(res:any)=> { this.recipeCount = res.length},
      error:(err:any) => console.log(err)
    })

  }
}
