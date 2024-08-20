import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderInvoicesListComponent } from './components/provider-invoices-list/provider-invoices-list.component';
import { ProviderInvoicesSingleComponent } from './components/provider-invoices-single/provider-invoices-single.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProviderInvoicesListComponent,
    ProviderInvoicesSingleComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  exports: [
    ProviderInvoicesListComponent
  ]
})
export class ProviderInvoicesModule { }
