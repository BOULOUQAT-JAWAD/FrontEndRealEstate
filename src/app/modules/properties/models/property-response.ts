import { PjService } from "../../pj-services/models/pj-service";
import { PropertyImage } from "./property-image";
import { PropertyStatus } from "./property-status";
import { PropertyType } from "./property-type";

export interface PropertyResponse {
    propertyId: number;
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
    propertyImages: PropertyImage[];
    pjServices: PjService[];
}
