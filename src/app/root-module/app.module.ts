import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './root-component/app.component';
import { PropertiesModule } from '../modules/properties/properties.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CoreModule } from '../core/core.module';
import { ProviderInvoicesModule } from '../modules/provider-invoices/provider-invoices.module';
import { ClientDashboardModule } from '../modules/client-dashboard/client-dashboard.module';
import { TravelerModule } from '../modules/traveler/traveler.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PropertiesModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CoreModule,
    ProviderInvoicesModule,
    ClientDashboardModule,
    TravelerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
