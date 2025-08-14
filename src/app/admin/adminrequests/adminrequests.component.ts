import { Component } from '@angular/core';
import { AdminheaderComponent } from '../adminheader/adminheader.component';
import { AdminsidebarComponent } from '../adminsidebar/adminsidebar.component';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-adminrequests',
  imports: [AdminheaderComponent,AdminsidebarComponent],
  templateUrl: './adminrequests.component.html',
  styleUrl: './adminrequests.component.css'
})
export class AdminrequestsComponent {
  allTestimonials:any = []
  constructor(private api:ApiService){}

  ngOnInit(){
    this.getAllTestimonials();
  }

  getAllTestimonials(){
    this.api.getAllTestimonialsApi().subscribe({
      next:(res:any)=>{
          this.allTestimonials = res;
          console.table(this.allTestimonials);
      },
      error:(err:any) => {
        console.log(err)
      }
    })
  }

  statusChange(id:any,status:string){
    this.api.updateTestimonialStatusApi(id,{status}).subscribe({
      next:(res:any)=>{
        console.log(res)
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }
}
