import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup

 constructor(private ul:FormBuilder, private api: ApiService){
    this.loginForm = ul.group({
      email: ["",[Validators.required]],
      password: ["",[Validators.required]]
    })
 }

 userLogin(){
   console.log(this.loginForm.value)
  //  return
    if(this.loginForm.invalid){
      alert('invalid values please refill')
    }else{
      this.api.userLoginApi(this.loginForm.value).subscribe({
        next: (result:any)=>{
          alert('login successful ')
          console.log(result)
        },
        error: (err:any) =>{
          alert('invalid credentials');
          console.log(`Invalid credentials ${err}`)
        }
      })
    }
 }
}
