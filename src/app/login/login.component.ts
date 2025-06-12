import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup

 constructor(private ul:FormBuilder, private api: ApiService, private router:Router){
    this.loginForm = ul.group({
      email: ["",[Validators.required]],
      password: ["",[Validators.required]]
    })
 }

 userLogin(){
   console.log(this.loginForm.value)
  //  return
    if(this.loginForm.invalid){
       Swal.fire({
            text: 'Aww',
            title: 'Please fill the form completely',
            icon:'info'
      })
    }else{
      this.api.userLoginApi(this.loginForm.value).subscribe({
        next: (result:any)=>{
          // console.log(result)

            Swal.fire({
              title: 'Login Successful',
              icon:'info'
            })

            sessionStorage.setItem('user',JSON.stringify(result.existingUser))
            sessionStorage.setItem('token',result.token)
            this.router.navigateByUrl('/')
        },
        error: (err:any) =>{
          Swal.fire({
            text: 'Oops',
            title: 'Invalid Credential',
            icon:'error'
          })
          console.log(`Invalid credentials `)
        }
      })
    }
 }
}
