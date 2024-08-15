import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesListComponent } from './components/properties-list/properties-list.component';
import { PropertySingleComponent } from './components/property-single/property-single.component';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PropertyFormComponent } from './components/property-form/property-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AppRoutingModule } from 'src/app/root-module/app-routing.module';
import { ReservationModule } from '../reservation/reservation.module';
import { PjServicesModule } from '../pj-services/pj-services.module';

@NgModule({
  declarations: [
    PropertiesListComponent,
    PropertySingleComponent,
    PropertyDetailsComponent,
    PropertyFormComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    ReservationModule,
    FormsModule,
    PjServicesModule
  ],
  exports: [
    PropertiesListComponent,
    PropertyDetailsComponent,
    PropertyFormComponent,
    PropertySingleComponent,
  ] 
})
export class PropertiesModule { }
