import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertiesListComponent } from '../modules/properties/components/properties-list/properties-list.component';

const routes: Routes = [
  {
    // path: "properties", component: PropertiesListComponent
    path: "properties", component: PropertiesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
