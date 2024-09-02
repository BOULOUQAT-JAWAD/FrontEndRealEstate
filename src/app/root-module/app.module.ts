import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './root-component/app.component';
import {AuthModule} from "../modules/auth/auth.module";
import { PropertiesModule } from '../modules/properties/properties.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CoreModule } from '../core/core.module';
import { ProviderInvoicesModule } from '../modules/provider-invoices/provider-invoices.module';
import { ClientDashboardModule } from '../modules/client-dashboard/client-dashboard.module';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { TokenInterceptor } from '../modules/auth/interceptor/token.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    HttpClientModule,
    PropertiesModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    ProviderInvoicesModule,
    ClientDashboardModule,
    NgxWebstorageModule.forRoot(),
    ToastrModule.forRoot()

  ],
  providers: [
//    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
