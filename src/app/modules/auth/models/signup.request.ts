export interface SignupRequest {
  firstName: string ;
  lastName: string ;
  phoneNumber: string ;
  email: string;
  password: string ;
  role: Role ;
}

export enum Role {
  CLIENT = 'CLIENT',
  TRAVELER = 'TRAVELER',
  ADMIN = 'ADMIN',
  PROVIDER = 'PROVIDER'
}
