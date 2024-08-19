import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertiesListComponent } from '../modules/properties/components/properties-list/properties-list.component';
import { PropertyDetailsComponent } from '../modules/properties/components/property-details/property-details.component';
import { PropertyFormComponent } from '../modules/properties/components/property-form/property-form.component';
import { PropertySingleComponent } from '../modules/properties/components/property-single/property-single.component';
import { ProviderInvoicesListComponent } from '../modules/provider-invoices/components/provider-invoices-list/provider-invoices-list.component';
import { ReservationListComponent } from '../modules/reservation/components/reservation-list/reservation-list.component';
import { MyDashboardComponent } from '../modules/client-dashboard/components/my-dashboard/my-dashboard.component';

const routes: Routes = [
  {
    path: "client",
    children: [
      { path: "", component: MyDashboardComponent, },
      { path: "properties", component: PropertiesListComponent, },
      { path: "properties/:id", component: PropertyDetailsComponent },
      { path: 'property/add', component: PropertyFormComponent },
      { path: 'property/edit/:id', component: PropertyFormComponent },
      { path: 'property/delete/:id', component: PropertySingleComponent },
      { path: 'income', component: ReservationListComponent },
      { path: 'spent', component: ProviderInvoicesListComponent },
    ]
  },
  {
    path: "",
    children: [
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
