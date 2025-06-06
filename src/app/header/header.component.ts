import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLogged: boolean = false
  username: string = ''

  ngOnInit(){
    if (sessionStorage.getItem('token')){
      this.isLogged = true;
      this.username = JSON.parse(sessionStorage.getItem('user') || '').username
      console.log(this.isLogged)
      console.log(this.username)
    }
  }

}
