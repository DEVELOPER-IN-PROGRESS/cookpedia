import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../service/api.service';
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
      alert('please fill the form completely')
    }else{
      this.api.registerApi(this.registerForm.value).subscribe({
        next:(result:any) => {
           console.log(result)
        },
        error: (err:any) => {
          console.log(`${err}`)
        }
      }
      )
    }

  }
}
