import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { PropertiesModule } from '../properties/properties.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PropertiesModule
  ],
  exports: [
    HomeComponent
  ]
})
export class TravelerModule { }
