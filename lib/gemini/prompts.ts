export const AADHAAR_EXTRACTION_PROMPT = `Extract the following information from this Aadhaar card image in JSON format:
  - Name
  - Father's Name
  - Date of Birth
  - Gender
  - Aadhaar Number
  - Address (full address as a single string)
  - Address Components:
    - Street (if available)
    - Locality (if available)
    - District
    - State
    - PIN Code

Return the data in the following JSON structure:
{
  "name": "string",
  "fatherName": "string",
  "dateOfBirth": "string",
  "gender": "string",
  "aadhaarNumber": "string",
  "address": "string",
  "addressComponents": {
    "street": "string",
    "locality": "string",
    "district": "string",
    "state": "string",
    "pinCode": "string"
  }
}

Only return the JSON object, nothing else. Ensure all fields are present in the response.`;