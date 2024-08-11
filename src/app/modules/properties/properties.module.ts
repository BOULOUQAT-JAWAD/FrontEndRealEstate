import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesListComponent } from './components/properties-list/properties-list.component';
import { PropertySingleComponent } from './components/property-single/property-single.component';

@NgModule({
  declarations: [
    PropertiesListComponent,
    PropertySingleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PropertiesListComponent
  ] 
})
export class PropertiesModule { }
