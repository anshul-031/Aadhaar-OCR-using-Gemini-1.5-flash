export interface AadhaarData {
  name: string;
  careOf: {
    name: string;
    relationship: string;
  };
  dateOfBirth: string;
  gender: string;
  aadhaarNumber: string;
  address: string;
  addressComponents: {
    street?: string;
    locality?: string;
    district: string;
    state: string;
    pinCode: string;
  };
  documentType: string;
}