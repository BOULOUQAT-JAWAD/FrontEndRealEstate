import { TestBed } from '@angular/core/testing';

import { ProviderInvoiceService } from './provider-invoice.service';

describe('ProviderInvoiceService', () => {
  let service: ProviderInvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProviderInvoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
