import { PjService } from "../../pj-services/models/pj-service";

export interface PropertyRequest {
    propertyId?: number;
    title:string;
    description: string;
    country: string;
    city: string;
    propertyType: string;
    propertyStatus: string;
    numberOfRooms: number;
    numberOfPersons: number;
    surface: number;
    pricePerNight: number;
    publish: boolean;
    propertyImages: String[];
  }