import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjServicesListComponent } from './components/pj-services-list/pj-services-list.component';
import { PjServicesSingleComponent } from './components/pj-services-single/pj-services-single.component';



@NgModule({
  declarations: [
    PjServicesListComponent,
    PjServicesSingleComponent,
  ],
  imports: [
    CommonModule
  ], 
  exports:[
    PjServicesListComponent,
  ]
})
export class PjServicesModule { }
