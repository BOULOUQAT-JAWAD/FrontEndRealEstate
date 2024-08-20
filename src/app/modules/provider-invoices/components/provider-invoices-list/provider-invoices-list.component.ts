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

  startDate: string | undefined;
  endDate: string | undefined;

  clientReservationsServices: ProviderInvoice[] = [];
  clientPropertiessServices: ProviderInvoice[] = [];

  loadingReservation = false;
  loadingProperty = false;

  errorReservation = false;
  errorProperty = false;

  constructor(private router: Router, private providerInvoiceService: ProviderInvoiceService, private customSnackBar: CustomSnackBarService) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges");
  }

  ngOnInit(): void {
    const today = new Date();
    const nextDate = new Date();
    nextDate.setDate(today.getDate() + 30);

    this.startDate = today.toISOString().split('T')[0];
    this.endDate = nextDate.toISOString().split('T')[0];

    this.fetchInvoices();
  }

  fetchInvoices(): void {
    if (this.validateDates()) {
      this.fetchReservationsInvoices();
      this.fetchPropertiesInvoices();
    }
  }

  validateDates(): boolean {
    if (!this.startDate || !this.endDate) {
      this.errorProperty = true;
      this.errorReservation = true;
      this.customSnackBar.show('Veuillez sélectionner les deux dates.', 'warning', 'yellow');
      return false;
    }

    if (new Date(this.endDate) < new Date(this.startDate)) {
      this.errorProperty = true;
      this.errorReservation = true;
      this.customSnackBar.show('La date de fin doit être postérieure à la date de début.', 'warning', 'yellow');
      return false;
    }

    return true;
  }

  fetchReservationsInvoices() {
    this.loadingReservation = true;
    this.errorReservation = false;
    this.providerInvoiceService.getClientReservationsServices(this.startDate, this.endDate, null).subscribe(
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
    this.providerInvoiceService.getClientPropertiesServices(this.startDate, this.endDate, null).subscribe(
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

  filterInvoices(): void {
    this.fetchInvoices();
  }

  getTotalCharges(): number {
    const reservationCharges = this.clientReservationsServices.reduce((sum, invoice) => sum + invoice.gain, 0);
    const propertyCharges = this.clientPropertiessServices.reduce((sum, invoice) => sum + invoice.gain, 0);
    return reservationCharges + propertyCharges;
  }
}