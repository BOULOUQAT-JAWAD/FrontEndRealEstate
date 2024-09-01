import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertiesListComponent } from '../modules/properties/components/properties-list/properties-list.component';
import { PropertyDetailsComponent } from '../modules/properties/components/property-details/property-details.component';
import { PropertyFormComponent } from '../modules/properties/components/property-form/property-form.component';
import { PropertySingleComponent } from '../modules/properties/components/property-single/property-single.component';
import { MyDashboardComponent } from '../modules/client-dashboard/components/my-dashboard/my-dashboard.component';
import { ReservationListComponent } from '../modules/reservation/components/reservation-list/reservation-list.component';
import { ProviderInvoicesListComponent } from '../modules/provider-invoices/components/provider-invoices-list/provider-invoices-list.component';
import { HomeComponent } from '../modules/traveler/components/home/home.component';

const routes: Routes = [
  {
    path: "", component: HomeComponent
  },
  {
    path: "client",
    children: [
      { path: "dashboard", component: MyDashboardComponent, },
      { path: "reservations", component: ReservationListComponent, },
      { path: "providerInvoices/properties", component: ProviderInvoicesListComponent, },
      { path: "properties", component: PropertiesListComponent, },
      { path: "properties/:id", component: PropertyDetailsComponent },
      { path: 'property/add', component: PropertyFormComponent },
      { path: 'property/edit/:id', component: PropertyFormComponent },
      { path: 'property/delete/:id', component: PropertySingleComponent }
    ]
  },
  {
    path: "traveler",
    children: [
      // { path: "dashboard", component: MyDashboardComponent, }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
