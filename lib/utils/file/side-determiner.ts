import { AadhaarSide } from '../../types/file';
import { logger } from '../logger';

export function determineSide(totalFiles: number, index: number): AadhaarSide {
  logger.debug('Determining file side', { totalFiles, fileIndex: index });
  
  if (totalFiles === 1) {
    return 'complete';
  }
  
  if (totalFiles === 2) {
    return index === 0 ? 'front' : 'back';
  }
  
  throw new Error('Invalid number of files');
}