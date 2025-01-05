import { AadhaarData } from '@/lib/types';
import { logger } from '../logger';

export function verifyFatherName(data: AadhaarData): { 
  isValid: boolean;
  source: 'primary' | 'address' | null;
  value: string | null;
} {
  try {
    // Check primary father's name field
    if (data.fatherName && data.fatherName.trim() !== '') {
      logger.debug('Father\'s name found in primary field', { name: data.fatherName });
      return {
        isValid: true,
        source: 'primary',
        value: data.fatherName.trim()
      };
    }

    // Check address for father's name patterns
    const addressPatterns = [
      /S\/O\s+([^,]+)/i,      // S/O pattern
      /Son\s+of\s+([^,]+)/i,  // Son of pattern
      /C\/O\s+([^,]+)/i       // C/O pattern
    ];

    for (const pattern of addressPatterns) {
      const match = data.address.match(pattern);
      if (match && match[1]) {
        const extractedName = match[1].trim();
        logger.debug('Father\'s name found in address', { name: extractedName });
        return {
          isValid: true,
          source: 'address',
          value: extractedName
        };
      }
    }

    logger.warn('Father\'s name not found in either primary field or address');
    return {
      isValid: false,
      source: null,
      value: null
    };
  } catch (error) {
    logger.error('Error verifying father\'s name', error);
    throw error;
  }
}