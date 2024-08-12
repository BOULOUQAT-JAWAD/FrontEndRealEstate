import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesListComponent } from './components/properties-list/properties-list.component';
import { PropertySingleComponent } from './components/property-single/property-single.component';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    PropertiesListComponent,
    PropertySingleComponent,
    PropertyDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    PropertiesListComponent,
    PropertyDetailsComponent
  ] 
})
export class PropertiesModule { }
