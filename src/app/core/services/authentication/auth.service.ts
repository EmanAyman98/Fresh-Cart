import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userToken:any
  constructor(private _HttpClient:HttpClient) { }


  decodeToken(){
    if(sessionStorage.getItem('token')){
      this.userToken = jwtDecode(sessionStorage.getItem('token')!)
      } 
  }
  signUp(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data)
  }

  signIn(data:object):Observable<any>{
 return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data)
  }

  forgotPassword(email: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,{email})
  }
}
