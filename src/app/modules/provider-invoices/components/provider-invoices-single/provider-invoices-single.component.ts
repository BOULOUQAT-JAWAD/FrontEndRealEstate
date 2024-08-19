import { Component, Input } from '@angular/core';
import { ProviderInvoice } from '../../models/provider-invoice';

@Component({
  selector: 'app-provider-invoices-single',
  templateUrl: './provider-invoices-single.component.html',
  styleUrls: ['./provider-invoices-single.component.scss']
})
export class ProviderInvoicesSingleComponent {

  @Input() providerInvoice!: ProviderInvoice;

}
