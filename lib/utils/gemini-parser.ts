import { AadhaarData } from '../types';

export function parseGeminiResponse(response: any): AadhaarData {
  try {
    // Extract the JSON string from the response
    const jsonText = response.candidates[0].content.parts[0].text;
    
    // Remove markdown code block syntax and parse JSON
    const cleanJson = jsonText.replace(/```json\n|\n```/g, '');
    const parsedData = JSON.parse(cleanJson);

    // Map the response fields to our AadhaarData type
    return {
      name: parsedData['Name'],
      fatherName: parsedData["Father's Name"],
      dateOfBirth: parsedData['Date of Birth'],
      gender: parsedData['Gender'],
      aadhaarNumber: parsedData['Aadhaar Number'],
      address: parsedData['Address']
    };
  } catch (error) {
    throw new Error('Failed to parse Gemini response: ' + (error as Error).message);
  }
}