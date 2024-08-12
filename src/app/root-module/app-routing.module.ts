import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertiesListComponent } from '../modules/properties/components/properties-list/properties-list.component';
import { PropertyDetailsComponent } from '../modules/properties/components/property-details/property-details.component';
import { PropertyFormComponent } from '../modules/properties/components/property-form/property-form.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {path: "properties", component: PropertiesListComponent,},
      {path: "properties/:id", component: PropertyDetailsComponent},
      { path: 'property/add', component: PropertyFormComponent },
      { path: 'property/edit/:id', component: PropertyFormComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
