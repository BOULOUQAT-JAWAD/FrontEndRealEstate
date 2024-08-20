import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderInvoicesListTypeComponent } from './provider-invoices-list-type.component';

describe('ProviderInvoicesListTypeComponent', () => {
  let component: ProviderInvoicesListTypeComponent;
  let fixture: ComponentFixture<ProviderInvoicesListTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProviderInvoicesListTypeComponent]
    });
    fixture = TestBed.createComponent(ProviderInvoicesListTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
