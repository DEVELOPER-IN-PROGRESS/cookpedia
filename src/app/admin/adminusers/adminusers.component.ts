import { Component } from '@angular/core';
import { AdminheaderComponent } from '../adminheader/adminheader.component';
import { AdminsidebarComponent } from '../adminsidebar/adminsidebar.component';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-adminusers',
  imports: [AdminsidebarComponent,AdminheaderComponent],
  templateUrl: './adminusers.component.html',
  styleUrl: './adminusers.component.css'
})
export class AdminusersComponent {
  allUsers:any = [];
  constructor(private api:ApiService){}

  ngOnInit(){
     this.fetchAllUsers()
  }

  fetchAllUsers(){
    this.api.getAllUsersApi().subscribe({
      next: (res:any)=>{
         this.allUsers = res;
      },

      error:(err:any) => {
        console.log(err);
      }
    })
  }
}
