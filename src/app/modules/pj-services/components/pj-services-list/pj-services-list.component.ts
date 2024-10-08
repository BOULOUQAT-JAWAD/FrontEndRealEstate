import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { PjService } from '../../models/pj-service';
import { PjServicesService } from '../../services/pj-services.service';
import { PropertyService } from 'src/app/modules/properties/services/property.service';
import { PropertyResponse } from 'src/app/modules/properties/models/property-response';
import { LocalStorageService } from 'ngx-webstorage';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-pj-services-list',
  templateUrl: './pj-services-list.component.html',
  styleUrls: ['./pj-services-list.component.scss']
})
export class PjServicesListComponent implements OnInit{
  servicesList: PjService[] = [];
  propertiesList:PropertyResponse[] = [];
  error: string | null = null;
  selectedProperties: { [key: string]: Set<string> } = {}; // propertyId: Set of serviceIds
  cartItems: { propertyId: string; pjServicesIds: string[] }[] = [];


  constructor(private pjServiceService: PjServicesService,
    private localStorage:LocalStorageService,private propertyService:PropertyService
    ,private cdr: ChangeDetectorRef,private toastr:ToastrService) {}

  ngOnInit(): void {
    this.fetchPjServices();
    this.fetchClientProperties();
  }
  fetchClientProperties() {
    this.propertyService.getClientProperties(null,null).subscribe({
      next: (returnedProperties: PropertyResponse[]) => {
        console.log(returnedProperties)
        this.propertiesList = returnedProperties;
        this.cdr.detectChanges();
        console.log(this.propertiesList)
      },
      error: (err) => {
        console.error('Error fetching properties', err);
        this.error = 'Impossible de charger les propriétés. Veuillez réessayer ultérieurement.';
      }
    });
  }

  fetchPjServices(): void {
    this.pjServiceService.getPjServicesForClient().subscribe({
      next: (services: PjService[]) => {
        this.servicesList = services;
      },
      error: (err) => {
        console.error('Error fetching services', err);
        this.error = 'Impossible de charger les services. Veuillez réessayer ultérieurement.';
      }
    });
  }

  
    // Handle property-service selection
    onPropertyServiceChange(serviceId: number,serviceTitle:string,servicePrice:number, propertyId: number, propertyTitle:string,event: Event) {
      const inputElement = event.target as HTMLInputElement;
      const isSelected = inputElement.checked;
      const selectedPropertiesIdStr :string =  propertyId+"-"+propertyTitle;

      if (!this.selectedProperties[selectedPropertiesIdStr]) {
        this.selectedProperties[selectedPropertiesIdStr] = new Set<string>();
      }
    
      if (isSelected) {
        this.selectedProperties[selectedPropertiesIdStr].add(serviceId+"-"+serviceTitle+"-"+servicePrice);
      } else {
        this.selectedProperties[selectedPropertiesIdStr].delete(serviceId+"-"+serviceTitle+"-"+servicePrice);
      }
    }
    
  
    // Generate the JSON structure on form submission
    addToCart() {
      const propertyServiceCheckouts = [];
      console.log(this.selectedProperties)
      for (const propertyId in this.selectedProperties) {
        const serviceIds = Array.from(this.selectedProperties[propertyId]);
        if (serviceIds.length > 0) {
          propertyServiceCheckouts.push({
            propertyId: propertyId,
            pjServicesIds: serviceIds
          });
        }
      }
  
      const checkoutData = { propertyServiceCheckouts };
      console.log(checkoutData); // This is where you can send the data to your backend or handle it further.
      this.localStorage.store("cart",JSON.stringify(checkoutData));
      if (Object.keys(this.selectedProperties).length === 0) {
        this.toastr.info("vous n'avez choisi aucun service")
      } else {
        this.toastr.success("éléments ajoutés à la carte avec succès, pouvez-vous s'il vous plaît vérifier votre carte")
      }
     // this.cartItems = checkoutData.propertyServiceCheckouts; // Optionally display added items in the cart
    }

    trackByProperty(index: number, property: any): string {
      return property.propertyId; // Ensure that the property ID is unique
    }

}
