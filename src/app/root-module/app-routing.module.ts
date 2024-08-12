import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertiesListComponent } from '../modules/properties/components/properties-list/properties-list.component';
import { PropertyDetailsComponent } from '../modules/properties/components/property-details/property-details.component';

const routes: Routes = [
  {
    path: "properties", component: PropertiesListComponent
  },
  {
    path: "properties/:id", component: PropertyDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
