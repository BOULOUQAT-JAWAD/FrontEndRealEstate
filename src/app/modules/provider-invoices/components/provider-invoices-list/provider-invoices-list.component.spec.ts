import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderInvoicesListComponent } from './provider-invoices-list.component';

describe('ProviderInvoicesListComponent', () => {
  let component: ProviderInvoicesListComponent;
  let fixture: ComponentFixture<ProviderInvoicesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProviderInvoicesListComponent]
    });
    fixture = TestBed.createComponent(ProviderInvoicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
