export interface PjService {
    pjServiceId: number;
    title: string;
    description: string;
    price: number;
    pjServiceType: PjServiceType;
}

export enum PjServiceType {
    Voyageur = 'Voyageur',
    Client = 'Client'
}