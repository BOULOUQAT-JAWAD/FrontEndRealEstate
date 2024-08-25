import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from "../modules/auth/componenets/signup/signup.component";
import {LoginComponent} from "../modules/auth/componenets/login/login.component";
import {ActivateGuard} from "../modules/auth/guard/activation.guard";

const routes: Routes = [
  {path:"signup", component:SignupComponent},
  {path:"login", component:LoginComponent},
  {path:"activate", canActivate:[ActivateGuard],component:LoginComponent},

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
