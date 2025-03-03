
import { AuthService } from './../../core/services/authentication/auth.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators ,ReactiveFormsModule,AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';
@Component({
  selector: 'app-login',
 imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  resText!:string
  loading:boolean = false;
  isForgotPassword: boolean = false;
  message: string = '';

  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router);
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)])
  });
   forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  });

  showUserData(){
    if(this.loginForm.valid){
      this.loading = true;
      // console.log("FormContent: ",this.loginForm.value)
      this._AuthService.signIn(this.loginForm.value).subscribe({
        next:(res)=>{
          // console.log(res),
          this.loading = false;
          sessionStorage.setItem('token',res.token)
          console.log("userToken: ",res.token)
          if(sessionStorage.getItem('token')){
            let x = jwtDecode(sessionStorage.getItem('token')!)
            console.log(x)
          }else{
            console.log("error")
          }
          this._AuthService.decodeToken()
          this._Router.navigate(['\home'])
        },
        error:(err)=>{
          this.loading = false;
          this.resText = err.error.message
          this.loginForm.setErrors({missMatch:true})
          // console.log(err.error.message)
       
  
        }
      })
    }else{
      this.loginForm.markAllAsTouched()
    }
    
   
  }

  requestPasswordReset() {
    if (this.forgotPasswordForm.invalid) return;

    this.loading = true;
    this.message = '';

    const email = this.forgotPasswordForm.value.email;
    this._AuthService.forgotPassword(email).subscribe({
      next: (res) => {
        this.message = 'Password reset link sent to your email!';
        this.loading = false;
      },
      error: (err) => {
        this.message = 'Error: Unable to send reset email.';
        this.loading = false;
      }
    });
  }
  toggleForgotPassword() {
    this.isForgotPassword = !this.isForgotPassword;
    this.message = ''; // Reset message
  }
}
