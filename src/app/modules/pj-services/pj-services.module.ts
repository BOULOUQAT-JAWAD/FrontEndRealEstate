import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjServicesListComponent } from './components/pj-services-list/pj-services-list.component';
import { PjServicesSingleComponent } from './components/pj-services-single/pj-services-single.component';
import { SharedModule } from "../../shared/shared.module";
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PjServicesListComponent,
    PjServicesSingleComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
], 
  exports:[
    PjServicesListComponent,
  ]
})
export class PjServicesModule {


 }
