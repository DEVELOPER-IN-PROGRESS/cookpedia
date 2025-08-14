import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-contact',
  imports: [HeaderComponent, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  testimonialForm: FormGroup

  constructor(private fb:FormBuilder, private api:ApiService){
    this.testimonialForm = fb.group({
      name:["",[Validators.required, Validators.pattern('[a-zA-Z]*')]],
      email:["",[Validators.required, Validators.email ]],
      message:["",[Validators.required, Validators.pattern('[a-zA-Z0-9 .]')]],
    })
  }

  submitForm(){
    console.log(this.testimonialForm.value.invalid)
    if(this.testimonialForm.value.invalid){
      Swal.fire({
        title:'Oops',
        text: 'Please fill the form properly',
        icon: 'info'
      })
    }else{
        this.api.addNewTestimonialApi(this.testimonialForm.value).subscribe({
          next:(res:any)=>{
            console.log(res)
            Swal.fire({
            title:'Aww',
            text: 'Testinmonial added successfully',
            icon: 'success'
          })
          this.testimonialForm.reset();
          },

          error:(err:any)=>{
            console.log(err);
            Swal.fire({
            title:'Oops',
            text: 'Something went wrong',
            icon: 'info'
          })
          }

        })

    }
  }
}
