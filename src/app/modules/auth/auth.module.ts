import { NgModule } from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import { SignupComponent } from './componenets/signup/signup.component';
import { LoginComponent } from './componenets/login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {LocalStorageService} from "ngx-webstorage";
import { ActivationComponent } from './componenets/activation/activation.component';



@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    ActivationComponent
  ],
  exports: [
    SignupComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  providers : [
    LocalStorageService
  ]
})
export class AuthModule { }
