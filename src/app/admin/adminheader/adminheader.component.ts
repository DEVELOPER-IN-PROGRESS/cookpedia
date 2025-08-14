import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminheader',
  imports: [],
  templateUrl: './adminheader.component.html',
  styleUrl: './adminheader.component.css'
})
export class AdminheaderComponent {

  constructor(private router:Router){
  }

  logout(){
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('token')
    this.router.navigateByUrl('/')
  }
}
