import { PropertyStatus } from "./property-status";
import { PropertyType } from "./property-type";

export interface PropertyResponse {
    propertyId: number;
    title:string;
    description: string;
    country: string;
    city: string;
    propertyType: PropertyType;
    propertyStatus: PropertyStatus;
    numberOfRooms: number;
    numberOfPersons: number;
    surface: number;
    occupiedFrom: Date;
    occupiedTo: Date;
    pricePerNight: number;
    publish: boolean;
    valid: boolean;
    propertyImages: string[];
}
