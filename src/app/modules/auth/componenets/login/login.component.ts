import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginRequest} from "../../models/login.request";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import { ToastrService } from 'ngx-toastr';
import { LoginResponse } from '../../models/login.response';


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
          this.toastr.success("Veuillez vérifier votre boîte de réception pour l'e-mail d'activation afin d'activer votre compte avant de vous connecter !"
,"Inscription réussie")
        }
      }
    );
    this.activeRoute.queryParamMap.subscribe(
      (params)=>{
        if (params.get("loggedin") == 'false'){
          this.toastr.info("Veuillez d'abord vous connecter")
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
      (response:LoginResponse)=>{
        if(response.role == "CLIENT"){
          this.router.navigate(["/client/dashboard"]).then(
            ()=>{
              window.location.reload()
            }
          )
        }
        else if(response.role == "TRAVELER"){
          this.router.navigate(["/"]).then(
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
        this.toastr.error("l'email ou le mot de passe que vous avez saisi ne sont pas corrects !")
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
