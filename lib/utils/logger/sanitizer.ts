import { AadhaarData } from '../../types';

export function sanitizeData(data: any): any {
  if (data instanceof Error) {
    return {
      name: data.name,
      message: data.message,
      stack: data.stack,
    };
  }

  if (data instanceof File) {
    return {
      name: data.name,
      type: data.type,
      size: data.size,
    };
  }

  if (isAadhaarData(data)) {
    return {
      ...data,
      aadhaarNumber: '********' + data.aadhaarNumber.slice(-4),
    };
  }

  return data;
}

function isAadhaarData(data: any): data is AadhaarData {
  return data && 
         typeof data === 'object' && 
         'aadhaarNumber' in data;
}