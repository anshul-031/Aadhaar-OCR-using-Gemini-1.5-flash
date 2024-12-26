import { GoogleGenerativeAI } from '@google/generative-ai';
import { AadhaarData } from './types';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function extractAadhaarData(
  imageBase64: string,
  mimeType: string
): Promise<AadhaarData> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
    
    const imageData = {
      inlineData: {
        data: imageBase64,
        mimeType,
      },
    };

    const prompt = `Extract the following information from this Aadhaar card image in JSON format:
      - Name
      - Father's Name
      - Date of Birth
      - Gender
      - Aadhaar Number
      - Address
      Only return the JSON object, nothing else. Ensure all fields are present in the response.`;

    const result = await model.generateContent([prompt, imageData]);
    const response = await result.response;
    const parsedData = JSON.parse(response.text());

    // Validate the response has all required fields
    const requiredFields = ['name', 'fatherName', 'dateOfBirth', 'gender', 'aadhaarNumber', 'address'];
    for (const field of requiredFields) {
      if (!parsedData[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    return parsedData;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to extract data from image');
  }
}