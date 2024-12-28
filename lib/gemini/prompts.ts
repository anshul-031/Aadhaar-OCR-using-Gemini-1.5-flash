export const AADHAAR_EXTRACTION_PROMPT = `I will provide you with one or two images of an Aadhaar card (front and/or back). Extract ALL available information from these images and combine them into a single comprehensive response.

Extract and combine the following information from the provided Aadhaar card image(s) in JSON format:
  - Name (from front)
  - Father's Name (from front)
  - Date of Birth (from front)
  - Gender (from front)
  - Aadhaar Number (from front)
  - Address (full address as a single string, from back)
  - Address Components:
    - Street (if available, from back)
    - Locality (if available, from back)
    - District (from back)
    - State (from back)
    - PIN Code (from back)

If both front and back images are provided, combine the information from both sides.
If only one side is provided, extract whatever information is available from that side.

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

Only return the JSON object, nothing else. For any fields that cannot be extracted from the provided image(s), use an empty string.`;