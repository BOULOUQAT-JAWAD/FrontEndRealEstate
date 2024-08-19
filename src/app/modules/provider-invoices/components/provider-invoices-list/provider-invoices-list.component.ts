import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProviderInvoice } from '../../models/provider-invoice';
import { Router } from '@angular/router';
import { CustomSnackBarService } from 'src/app/shared/custom-snack-bar/custom-snack-bar.service';
import { ProviderInvoiceService } from '../../services/provider-invoice.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-provider-invoices-list',
  templateUrl: './provider-invoices-list.component.html',
  styleUrls: ['./provider-invoices-list.component.scss']
})
export class ProviderInvoicesListComponent implements OnInit, OnChanges {
  
  clientReservationsServices: ProviderInvoice[] = [];
  clientPropertiessServices: ProviderInvoice[] = [];

  loadingReservation = false;
  loadingProperty = false;
  
  errorReservation = false;
  errorProperty = false;

  constructor(private router: Router, private providerInvoiceService: ProviderInvoiceService, private customSnackBar: CustomSnackBarService) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges");
  }
  
  ngOnInit(): void {
    if (this.providerInvoiceService.clientReservationsServices.length === 0) {
      this.fetchReservationsInvoices();
    } else {
      this.clientReservationsServices = this.providerInvoiceService.clientReservationsServices;
    }

    if (this.providerInvoiceService.clientPropertiessServices.length === 0) {
      this.fetchPropertiesInvoices();
    } else {
      this.clientPropertiessServices = this.providerInvoiceService.clientPropertiessServices;
    }
  }

  fetchReservationsInvoices() {
    this.loadingReservation = true;
    this.errorReservation = false;
    this.providerInvoiceService.getClientReservationsServices().subscribe(
      (response) => {
        this.clientReservationsServices = response;
        this.loadingReservation = false;
        if (this.clientReservationsServices.length === 0) {
          this.customSnackBar.show('Aucune facture de réservation trouvée.', 'info', 'blue');
        }
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.loadingReservation = false;
        this.errorReservation = true;
        this.customSnackBar.show('Erreur lors de la récupération des factures. Veuillez réessayer plus tard.', 'error', 'red');
      }
    );
  }

  fetchPropertiesInvoices() {
    this.loadingProperty = true;
    this.errorProperty = false;
    this.providerInvoiceService.getClientPropertiesServices().subscribe(
      (response) => {
        this.clientPropertiessServices = response;
        this.loadingProperty = false;
        if (this.clientPropertiessServices.length === 0) {
          this.customSnackBar.show('Aucune facture de propriété trouvée.', 'info', 'blue');
        }
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.loadingProperty = false;
        this.errorProperty = true;
        this.customSnackBar.show('Erreur lors de la récupération des factures. Veuillez réessayer plus tard.', 'error', 'red');
      }
    );
  }

}
