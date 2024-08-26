import { Injectable } from '@angular/core';
import {map, Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SignupRequest} from "../models/signup.request";
import {environment} from "../../../environment/environment";
import {LoginRequest} from "../models/login.request";
import {LocalStorageService} from "ngx-webstorage";
import {LoginResponse} from "../models/login.response";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  saveUserInfoInLocalStorage(response: LoginResponse) {
    this.localStorage.store('token', response.token);
    this.localStorage.store('id', response.userId);
  
  }
  
  
  activateUser(token: string): Observable<LoginResponse> {
    return this.http.get<LoginResponse>(`${environment.baseUrl}auth/activate/${token}`);
  }

  isLoggedId:boolean=false;
  loginStatusChanged = new Subject<boolean>();

  adminRole:string=""
  constructor(private http:HttpClient,private localStorage:LocalStorageService) { }



  signUpService(singupForm:SignupRequest){
    return  this.http.post(environment.baseUrl+"auth/signup",singupForm)
  }

  loginService(loginForm:LoginRequest){
    return  this.http.post<LoginResponse>(environment.baseUrl+"auth/login",loginForm).pipe(
      map(
        (data:LoginResponse)=>{
          // if (data.role=='admin' || data.role=='delivery'){
          //   this.localStorage.store("adminRole",data.role)
          //   return false;
          // }
          // else {
            console.log("should work")
            this.localStorage.store('token', data.token);
            this.localStorage.store('id', data.userId);
            return  true;
          // }

        }
      )
    )
  }
  getUsername() {
    return this.localStorage.retrieve("username")
  }
  islogedin(){
    return (this.getJwt()!=null)
  }
  getJwt() {
    return this.localStorage.retrieve("token")
  }

  logout() {
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('expiresAt');
    window.location.reload()

  }
  handleToken(token: any) {
    return  this.http.get(environment.baseUrl+"auth/activate/"+token)

  }
}
