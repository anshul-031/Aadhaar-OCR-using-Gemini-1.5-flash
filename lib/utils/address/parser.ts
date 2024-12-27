import { AddressComponents } from '@/lib/types/address';

export function parseAddressComponents(address: string): AddressComponents {
  // Extract components from the full address string
  const pinCodeMatch = address.match(/(\d{6})/);
  const stateMatch = address.match(/([A-Za-z\s]+)\s*-\s*\d{6}/);
  
  // Find district by looking for "DIST:" or similar patterns
  const districtMatch = address.match(/DIST:\s*([^,]+)/i) || 
                       address.match(/District:\s*([^,]+)/i);

  return {
    street: extractStreet(address),
    locality: extractLocality(address),
    district: districtMatch ? districtMatch[1].trim() : '',
    state: stateMatch ? stateMatch[1].trim() : '',
    pinCode: pinCodeMatch ? pinCodeMatch[1] : ''
  };
}

function extractStreet(address: string): string {
  // Extract street address (usually comes before locality)
  const streetMatch = address.match(/^([^,]+)/);
  return streetMatch ? streetMatch[1].trim() : '';
}

function extractLocality(address: string): string {
  // Extract locality (usually between street and district)
  const localityMatch = address.match(/,\s*([^,]+?)(?:\s*,\s*(?:DIST|District)|$)/i);
  return localityMatch ? localityMatch[1].trim() : '';
}