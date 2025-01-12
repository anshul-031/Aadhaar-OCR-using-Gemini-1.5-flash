import { AadhaarData } from '@/lib/types';
import { logger } from '../logger';

export function verifyFatherName(data: AadhaarData): { 
  isValid: boolean;
  source: 'primary' | 'address' | null;
  value: { name: string; relationship: string } | null;
} {
  try {
    // Check primary careOf field
    if (data.careOf.name && data.careOf.name.trim() !== '') {
      logger.debug('Care of name found in primary field', { 
        name: data.careOf.name,
        relationship: data.careOf.relationship
      });
      return {
        isValid: true,
        source: 'primary',
        value: {
          name: data.careOf.name.trim(),
          relationship: data.careOf.relationship
        }
      };
    }

    // Check address for relationship patterns
    const relationshipPatterns = [
      { pattern: /S\/O\s+([^,]+)/i, relationship: 'Father' },      // S/O pattern
      { pattern: /Son\s+of\s+([^,]+)/i, relationship: 'Father' },  // Son of pattern
      { pattern: /C\/O\s+([^,]+)/i, relationship: 'Guardian' },    // C/O pattern
      { pattern: /W\/O\s+([^,]+)/i, relationship: 'Husband' },     // W/O pattern
      { pattern: /D\/O\s+([^,]+)/i, relationship: 'Father' }       // D/O pattern
    ];

    for (const { pattern, relationship } of relationshipPatterns) {
      const match = data.address.match(pattern);
      if (match && match[1]) {
        const extractedName = match[1].trim();
        logger.debug('Care of details found in address', { 
          name: extractedName,
          relationship
        });
        return {
          isValid: true,
          source: 'address',
          value: {
            name: extractedName,
            relationship
          }
        };
      }
    }

    logger.warn('No care of details found in either primary field or address');
    return {
      isValid: false,
      source: null,
      value: null
    };
  } catch (error) {
    logger.error('Error verifying care of details', error);
    throw error;
  }
}