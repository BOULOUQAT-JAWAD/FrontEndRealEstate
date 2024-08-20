import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProviderInvoice, ProviderInvoiceStatus, ServiceType } from '../../models/provider-invoice';
import { ProviderInvoiceService } from '../../services/provider-invoice.service';
import { CustomSnackBarService } from 'src/app/shared/custom-snack-bar/custom-snack-bar.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-provider-invoices-list-type',
  templateUrl: './provider-invoices-list-type.component.html',
  styleUrls: ['./provider-invoices-list-type.component.scss']
})
export class ProviderInvoicesListTypeComponent implements OnInit, OnChanges {

  startDate?: string;
  endDate?: string;
  status: ProviderInvoiceStatus | null = null;
  serviceType: ServiceType = ServiceType.property;

  providerInvoices: ProviderInvoice[] = [];

  public ProviderInvoiceStatusEnum = ProviderInvoiceStatus;

  loading = false;
  error = false;

  constructor(private router: Router, private providerInvoiceService: ProviderInvoiceService, private customSnackBar: CustomSnackBarService) { }

  checkServiceTypeRoute(): void {
    const url = this.router.url;
    let isReservation = url.includes('/client/providerInvoices/reservations');
    let isProperty = url.includes('/client/providerInvoices/properties');

    if (isReservation) {
      this.serviceType = ServiceType.reservation;
    }
    if (isProperty) {
      this.serviceType = ServiceType.property;
    }
  }

  clearFilter(): void {
    this.startDate = undefined;
    this.endDate = undefined;
    this.status = null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges");
  }

  ngOnInit(): void {
    this.checkServiceTypeRoute();
    const today = new Date();
    const nextDate = new Date();
    nextDate.setDate(today.getDate() + 30);

    this.startDate = today.toISOString().split('T')[0];
    this.endDate = nextDate.toISOString().split('T')[0];

    this.fetchInvoices();
  }

  fetchInvoices(): void {
    if (this.serviceType === ServiceType.reservation) {
      this.fetchReservationsInvoices();
    }
    if (this.serviceType === ServiceType.property) {
      this.fetchPropertiesInvoices();
    }

  }

  fetchReservationsInvoices() {
    this.loading = true;
    this.error = false;
    this.providerInvoiceService.getClientReservationsServices(this.startDate, this.endDate, this.status).subscribe(
      (response) => {
        this.providerInvoices = response;
        this.loading = false;
        if (this.providerInvoices.length === 0) {
          this.customSnackBar.show('Aucune facture de réservation trouvée.', 'info', 'blue');
        }
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.loading = false;
        this.error = true;
        this.customSnackBar.show('Erreur lors de la récupération des factures. Veuillez réessayer plus tard.', 'error', 'red');
      }
    );
  }

  fetchPropertiesInvoices() {
    this.loading = true;
    this.error = false;
    this.providerInvoiceService.getClientPropertiesServices(this.startDate, this.endDate, this.status).subscribe(
      (response) => {
        this.providerInvoices = response; 
        this.loading = false;
        if (this.providerInvoices.length === 0) {
          this.customSnackBar.show('Aucune facture de propriété trouvée.', 'info', 'blue');
        }
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.loading = false;
        this.error = true;
        this.customSnackBar.show('Erreur lors de la récupération des factures. Veuillez réessayer plus tard.', 'error', 'red');
      }
    );
  }
}
