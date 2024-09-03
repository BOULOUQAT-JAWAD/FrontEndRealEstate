import { Component, Input, OnInit } from '@angular/core';
import { PjService } from '../../models/pj-service';
import { PjServicesService } from '../../services/pj-services.service';

@Component({
  selector: 'app-pj-services-list',
  templateUrl: './pj-services-list.component.html',
  styleUrls: ['./pj-services-list.component.scss']
})
export class PjServicesListComponent implements OnInit{
  servicesList: PjService[] = [];
  error: string | null = null;

  constructor(private pjServiceService: PjServicesService) {}

  ngOnInit(): void {
    this.fetchPjServices();
  }

  fetchPjServices(): void {
    this.pjServiceService.getPjServicesForClient().subscribe({
      next: (services: PjService[]) => {
        this.servicesList = services;
      },
      error: (err) => {
        console.error('Error fetching services', err);
        this.error = 'Failed to load services. Please try again later.';
      }
    });
  }



  propertiesList = [
    { id: 1, name: 'Property 1' },
    { id: 2, name: 'Property 2' },
    { id: 3, name: 'Property 3' },
    // Add more properties as needed
  ];

  selectedProperties = {};
  cartItems = [];

  addToCart() {
    this.cartItems = [];
  /*   for (const serviceId in this.selectedProperties) {
      if (this.selectedProperties[serviceId].length > 0) {
        this.cartItems.push({
          serviceId: serviceId,
          properties: this.selectedProperties[serviceId]
        });
      }
    } */
  }

  getServiceName(serviceId: number) {
    const service = this.servicesList.find(s => s.pjServiceId === +serviceId);
    return service ? service.title : '';
  }

  getPropertyNames(propertyIds: number[]) {
    return this.propertiesList
      .filter(p => propertyIds.includes(p.id))
      .map(p => p.name)
      .join(', ');
  }

}
