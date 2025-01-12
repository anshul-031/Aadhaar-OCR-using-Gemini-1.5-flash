import { AddressComponents } from '@/lib/types/address';

function removeRelationshipPrefixes(address: string): string {
  // Remove common relationship prefixes
  return address.replace(/(?:S\/O|C\/O|D\/O|W\/O|Son of|Care of|Daughter of|Wife of)[^,]+,\s*/gi, '');
}

export function parseAddressComponents(address: string): AddressComponents {
  // Clean the address first
  const cleanedAddress = removeRelationshipPrefixes(address);
  
  // Extract components from the cleaned address string
  const pinCodeMatch = cleanedAddress.match(/(\d{6})/);
  const stateMatch = cleanedAddress.match(/([A-Za-z\s]+)\s*-\s*\d{6}/);
  
  // Find district by looking for "DIST:" or similar patterns
  const districtMatch = cleanedAddress.match(/DIST:\s*([^,]+)/i) || 
                       cleanedAddress.match(/District:\s*([^,]+)/i);

  return {
    street: extractStreet(cleanedAddress),
    locality: extractLocality(cleanedAddress),
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