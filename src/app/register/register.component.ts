import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../service/api.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm:FormGroup

  constructor (private fb:FormBuilder , private api:ApiService){
   this.registerForm =  fb.group({
      username:["",[Validators.required, Validators.pattern('[a-zA-Z]*')]],
      email:["",[Validators.required, Validators.email]],
      password: ["",[Validators.required, Validators.pattern('[a-zA-Z0-9@]*')]]
    })
  }

  register(){
    // console.log(this.registerForm.value)
    if(this.registerForm.invalid){
      Swal.fire({
      icon: "info",
      title: "Oops.. Please fill the form completely.",
      confirmButtonText: 'OK',
      // text: "Something went wrong!",
      // footer: '<a href="#">Why do I have this issue?</a>'
    });
    }else{
      this.api.registerApi(this.registerForm.value).subscribe({
        next:(result:any) => {
           console.log(result)
           Swal.fire({
             icon: 'success',
             title: 'Aww',
             text: 'Registration Successful',
           })
        },
        error: (err:any) => {
          console.log(`${err}`)
          Swal.fire({
            title: 'Oops',
            text:'',
            icon:'info'
          })
        }
      }
      )
    }

  }
}
