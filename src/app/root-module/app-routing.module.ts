import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertiesListComponent } from '../modules/properties/components/properties-list/properties-list.component';
import { PropertyDetailsComponent } from '../modules/properties/components/property-details/property-details.component';
import { PropertyFormComponent } from '../modules/properties/components/property-form/property-form.component';
import { PropertySingleComponent } from '../modules/properties/components/property-single/property-single.component';
import { MyDashboardComponent } from '../modules/client-dashboard/components/my-dashboard/my-dashboard.component';
import { ReservationListComponent } from '../modules/reservation/components/reservation-list/reservation-list.component';
import { ProviderInvoicesListComponent } from '../modules/provider-invoices/components/provider-invoices-list/provider-invoices-list.component';
import {SignupComponent} from "../modules/auth/componenets/signup/signup.component";
import {LoginComponent} from "../modules/auth/componenets/login/login.component";
import {ActivateGuard} from "../modules/auth/guard/activation.guard";
import { HomeComponent } from '../modules/traveler/components/home/home.component';
import { PropertiesListingComponent } from '../modules/traveler/components/properties-listing/properties-listing.component';
import { ActivationComponent } from '../modules/auth/componenets/activation/activation.component';
import { PjServicesListComponent } from '../modules/pj-services/components/pj-services-list/pj-services-list.component';
import { CartComponent } from '../modules/cart/components/cart/cart.component';
import { CartSuccessComponent } from '../modules/cart/components/cart-success/cart-success.component';

const routes: Routes = [
  {path:"signup", component:SignupComponent},
  {path:"login", component:LoginComponent},
  { path: 'activate', component: ActivationComponent },
  {
    path: "",
    children: [
      { path: "", component: HomeComponent, },
      { path: "properties", component: PropertiesListingComponent, },
    ]
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
      { path: 'property/delete/:id', component: PropertySingleComponent },
      { path: 'PjServices', component: PjServicesListComponent },
      { path: 'cart', component: CartComponent },
      { path: 'servicePayed', component: CartSuccessComponent }


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
