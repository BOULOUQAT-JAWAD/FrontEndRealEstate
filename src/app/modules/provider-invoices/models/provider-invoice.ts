export interface ProviderInvoice {
    providerInvoiceId: number;
    providerId: number;
    propertyId: number | null;
    reservationId: number | null;
    serviceType: ServiceType; 
    date: string;
    rating: string;
    gain: number;
    status: ProviderInvoiceStatus;
}

export enum ServiceType {
    reservation = 'reservation',
    property = 'property',
}

export enum ProviderInvoiceStatus {
    FAIT = 'FAIT',
    EN_COURS = 'EN_COURS',
    ANNULE = 'ANNULE',
}