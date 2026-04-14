import { Router } from '@angular/router';
import { ForgetPasswordDataResponse, ResetPasswordResponse ,ResetCodeResponse} from './../models/forget-password-data.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, WritableSignal, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UserdataResponse } from '../models/userdata.interface';
  import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private readonly httpClient= inject (HttpClient);
    private readonly router= inject (Router);

    islogged:WritableSignal<boolean>=signal<boolean>(false)

    
  sendRegisterdata(data: object):Observable<UserdataResponse>{
    return this.httpClient.post<UserdataResponse>(environment.base_url + "/api/v1/auth/signup" , data)
  }

   sendLogindata(data: object):Observable<UserdataResponse>{
    return this.httpClient.post<UserdataResponse>(environment.base_url + "/api/v1/auth/signin" , data)
  }

  
  forgetPassword(data: object): Observable<ForgetPasswordDataResponse> {
    return this.httpClient.post<ForgetPasswordDataResponse>(environment.base_url + '/api/v1/auth/forgetPasswords', data);
  }

  
  verifyResetCode(data: object): Observable<ResetCodeResponse> {
    return this.httpClient.post<ResetCodeResponse>(environment.base_url + '/api/v1/auth/verifyResetCode', data);
  }

  
  resetPassword(data: object): Observable<ResetPasswordResponse> {
    return this.httpClient.put<ResetPasswordResponse>(environment.base_url + '/api/v1/auth/resetPassword', data);
  }


  userSignOut():void{
    localStorage.removeItem("usertoken");
    localStorage.removeItem("userData");
    localStorage.removeItem("userdecode");
    this.islogged.set(false);

    this.router.navigate(["/login"]);

  }

  decodeToken():void{

const token = localStorage.getItem('usertoken');
if(token){
  const decoded = jwtDecode(token);

localStorage.setItem('userdecode', JSON.stringify(decoded))
  }
  }

}
