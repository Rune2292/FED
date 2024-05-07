

export interface EfModel {
    efModelId: number;
    efAccountId: number;
    account?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNo?: string;
    addressLine1?: string;
    addressLine2?: string;
    zip?: string;
    city?: string;
    country?: string;
    birthDate: Date;
    nationality?: string;
    height: number;
    shoeSize: number;
    hairColor?: string;
    eyeColor?: string;
    comments?: string;
  }