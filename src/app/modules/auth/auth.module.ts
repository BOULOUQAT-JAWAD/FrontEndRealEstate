import { NgModule } from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import { SignupComponent } from './componenets/signup/signup.component';
import { LoginComponent } from './componenets/login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
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
  ]
})
export class AuthModule { }
