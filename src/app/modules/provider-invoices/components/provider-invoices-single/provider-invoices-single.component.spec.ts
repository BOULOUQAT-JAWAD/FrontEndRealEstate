import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderInvoicesSingleComponent } from './provider-invoices-single.component';

describe('ProviderInvoicesSingleComponent', () => {
  let component: ProviderInvoicesSingleComponent;
  let fixture: ComponentFixture<ProviderInvoicesSingleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProviderInvoicesSingleComponent]
    });
    fixture = TestBed.createComponent(ProviderInvoicesSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
