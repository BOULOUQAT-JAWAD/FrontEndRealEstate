import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { PropertiesModule } from '../properties/properties.module';
import { CoreModule } from 'src/app/core/core.module';
import { PropertiesListingComponent } from './components/properties-listing/properties-listing.component';



@NgModule({
  declarations: [
    HomeComponent,
    PropertiesListingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PropertiesModule,
    CoreModule
  ],
  exports: [
    HomeComponent
  ]
})
export class TravelerModule { }
