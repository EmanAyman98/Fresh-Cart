import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
// Global Property
  resText!:string;
  loading:boolean = false;

// Inject service
private readonly _AuthService = inject(AuthService);
private readonly _Router = inject(Router);


// Register Form
registerForm:FormGroup = new FormGroup({
  name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
  email:new FormControl(null,[Validators.required,Validators.email]),
  password:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
  rePassword:new FormControl(null),
  phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[125][0-9]{8}$/)])
},this.compareValues)

showData():void{
  if(this.registerForm.valid){
    this.loading = true;
    console.log(this.registerForm.value);
    this._AuthService.signUp(this.registerForm.value).subscribe({
      next:(res)=>{
        console.log(res)
        this.loading = false;
        // Programming Routing 
        this._Router.navigate(['\login'])
      },
      error:(err)=>{
        this.loading = false;
         console.log("Error:",err.error.message);
         this.resText = err.error.message;
      }
    })
  }else{
    this.registerForm.setErrors({missMatch:true})
    this.registerForm.markAllAsTouched()
  }
}
// Password & rePassword
compareValues(fGroup:AbstractControl){
  if(fGroup.get('password')?.value === fGroup.get('rePassword')?.value){
    return null;
  }else{

    return {missMatch:true}
  }
}
}
