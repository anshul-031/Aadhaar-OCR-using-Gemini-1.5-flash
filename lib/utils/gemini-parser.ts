import { AadhaarData } from '../types';
import { parseAddressComponents } from './address/parser';

export function parseGeminiResponse(response: any): AadhaarData {
  try {
    // Extract the JSON string from the response
    const jsonText = response.candidates[0].content.parts[0].text;
    
    // Remove markdown code block syntax and parse JSON
    const cleanJson = jsonText.replace(/```json\n|\n```/g, '');
    const parsedData = JSON.parse(cleanJson);

    // Extract address components if not provided by the API
    const addressComponents = parsedData.addressComponents || 
                            parseAddressComponents(parsedData.Address || '');

    // Map the response fields to our AadhaarData type
    return {
      name: parsedData.Name || parsedData.name,
      fatherName: parsedData["Father's Name"] || parsedData.fatherName,
      dateOfBirth: parsedData["Date of Birth"] || parsedData.dateOfBirth,
      gender: parsedData.Gender || parsedData.gender,
      aadhaarNumber: parsedData["Aadhaar Number"] || parsedData.aadhaarNumber,
      address: parsedData.Address || parsedData.address,
      addressComponents: {
        street: addressComponents.street || '',
        locality: addressComponents.locality || '',
        district: addressComponents.district,
        state: addressComponents.state,
        pinCode: addressComponents.pinCode
      }
    };
  } catch (error) {
    throw new Error('Failed to parse Gemini response: ' + (error as Error).message);
  }
}