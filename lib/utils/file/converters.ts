import { logger } from '../logger';

export async function convertToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result as string;
      resolve(base64.split(',')[1]);
    };
    reader.onerror = (error) => {
      logger.error('Failed to convert file to base64', { error, fileName: file.name });
      reject(error);
    };
  });
}