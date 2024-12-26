import { GoogleGenerativeAI } from '@google/generative-ai';
import { AadhaarData } from './types';
import { validateImageFile } from './validation';

export async function processAadhaarImage(file: File): Promise<AadhaarData> {
  try {
    // Validate the file
    validateImageFile(file);

    // Convert file to base64
    const base64Image = await fileToBase64(file);

    // Extract data using Gemini
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '');
    const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

    const imageData = {
      inlineData: {
        data: base64Image.split(',')[1], // Remove data URL prefix
        mimeType: file.type,
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

    // Validate the response
    validateAadhaarData(parsedData);

    return parsedData;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to process image');
  }
}

function validateAadhaarData(data: any): asserts data is AadhaarData {
  const requiredFields = [
    'name',
    'fatherName',
    'dateOfBirth',
    'gender',
    'aadhaarNumber',
    'address',
  ];

  for (const field of requiredFields) {
    if (!data[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
}

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}