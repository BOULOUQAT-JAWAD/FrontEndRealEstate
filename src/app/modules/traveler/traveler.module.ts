import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { PropertiesModule } from '../properties/properties.module';
import { CoreModule } from 'src/app/core/core.module';
import { PropertiesListingComponent } from './components/properties-listing/properties-listing.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OnePropertyComponent } from './components/one-property/one-property.component';
import { PjServicesComponent } from './components/pj-services/pj-services.component';



@NgModule({
  declarations: [
    HomeComponent,
    PropertiesListingComponent,
    OnePropertyComponent,
    PjServicesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PropertiesModule,
    CoreModule,
    SharedModule
  ],
  exports: [
    HomeComponent
  ]
})
export class TravelerModule { }
