import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { SubscriptionService } from '../services/subscription.service';
import { ClientSubscription } from '../models/ClientSubscription.response';
import { SubsCheckout } from '../models/SubsCheckout.response';

@Component({
  selector: 'app-client-sidebar',
  templateUrl: './client-sidebar.component.html',
  styleUrls: ['./client-sidebar.component.scss']
})
export class ClientSidebarComponent implements OnInit{
navigateToCart() {
  this.activeRoute.navigate(['/client/cart']);
}

  subscription: ClientSubscription | null = null;

  constructor(private localStorage: LocalStorageService,
              private activeRoute: Router,
              private subscriptionService: SubscriptionService) { }

  ngOnInit(): void {
    this.getClientSubscription();
  }

  getClientSubscription(): void {
    this.subscriptionService.getClientSubscription().subscribe(
      (data: ClientSubscription) => {
        console.log(data)
        this.subscription = data;
      },
      error => {
        console.error('Error fetching subscription data', error);
        this.subscription = null;
      }
    );
  }

    logout() {
      this.localStorage.clear();
      this.activeRoute.navigate(['/']).then(() => {
        window.location.reload();
      });
    }

    subscribeNow() {
      this.subscriptionService.subscribeClient().subscribe(
        (data: SubsCheckout) => {
          console.log(data)
          window.location.href = data.checkoutUrl;
        },
        error => {
          console.error('Error while trying to subscribe ', error);
        }
      );

    }
    
}
