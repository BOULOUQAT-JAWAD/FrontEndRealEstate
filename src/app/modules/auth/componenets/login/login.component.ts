import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginRequest} from "../../models/login.request";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  formGroup!:FormGroup;

  loginReq!:LoginRequest;

  isloading:boolean=false;

  isLoginError!:boolean;

  constructor( private activeRoute:ActivatedRoute
    , private router:Router,private authService:AuthService,private toastr:ToastrService) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup<any>(
      {
        email: new FormControl('',Validators.required),
        password:new FormControl('',Validators.required)
      }
    );
    this.activeRoute.queryParamMap.subscribe(
      (params)=>{
        if (params.get("registered") == 'true'){
          console.log("coco")
          this.toastr.success("Please Check your inbox for activation email activate your account before you Login!"
            ,"Sign Up Successful")
        }
      }
    );
    this.activeRoute.queryParamMap.subscribe(
      (params)=>{
        if (params.get("loggedin") == 'false'){
          this.toastr.info("Please Log in first")
        }
      }
    );
    if (this.authService.islogedin()){
      this.router.navigate(["/"]).then(
        ()=>{
          window.location.reload()
        }
      )    
    }

  }


  loginUser() {
    this.isloading = true;


    this.loginReq={
      email:this.formGroup.get("email")?.value,
      password:this.formGroup.get("password")?.value
    }

    this.authService.loginService(this.loginReq).subscribe(
      (response)=>{

        this.isloading=false
        if (response){
          this.router.navigate(["/client/dashboard"]).then(
            ()=>{
              window.location.reload()
            }
          )
        } else {
          this.router.navigate(["/admin/products"]).then(
            ()=>{
              window.location.reload()
            }
          )
        }

      }
      ,
      error => {
        this.isloading=false
        console.log("error")
        this.toastr.error("the email or the password you entered are not correct!")
      }
    )
    // this.loginService.login(this.loginReq).subscribe(
    //   (data)=>{
    //     console.log(data)
    //     this.isloading=false;
    //     this.router.navigate(["/"]).then(
    //       ()=>{
    //         window.location.reload()
    //       }
    //     )
    //     this.toastr.success("Login Successful")
    //     console.log("success")
    //
    //   },error => {
    //     this.isLoginError=true;
    //     this.isloading=false;
    //
    //   }
    // )
  }
}
