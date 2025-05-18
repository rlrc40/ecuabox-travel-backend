export default interface NewOrder {
  amount: number;
  currency: string;
  concept: string;
  email: string;
  passengerData: PassengerData[];
  metadata: {
    startDate: string;
    endDate: string;
    pax: number;
    origin: string;
    destination: string;
  };
  createdAt: string;
}

interface Country {
  idDyn: number;
  name: string;
  isoCode2?: string;
  isoCode3?: string;
}

interface AddressInfo {
  commercialAddress?: string;
  commercialPostalCode?: string;
  commercialCountry?: Country;
  commercialProvince?: {
    idDyn: number;
    name: string;
  };
}

interface ContactInfo {
  phoneNumber?: string;
  web?: null | string;
  email?: string;
}

interface Insured {
  id?: null | number;
  version?: null | number;
  name?: string;
  surname?: string;
  treatment?: string;
  documentType?: string;
  documentNumber?: string;
  birthDate?: string;
  addressInfoList: AddressInfo[];
  contactInfoList: ContactInfo[];
}

export interface PassengerData {
  isMainInsured: boolean;
  insured: Insured;
}
