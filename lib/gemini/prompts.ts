export const AADHAAR_EXTRACTION_PROMPT = `I will provide you with one or two images of an Aadhaar card (front and/or back). Extract ALL available information from these images and combine them into a single comprehensive response.

IMPORTANT: Always translate and return ALL text in English, regardless of the original language in the Aadhaar card.

Extract and combine the following information from the provided Aadhaar card image(s) in JSON format:
  - Name (from front, translated to English if in regional language)
  - Father's Name (from front, translated to English if in regional language)
  - Date of Birth (from front)
  - Gender (from front, in English)
  - Aadhaar Number (from front)
  - Address (full address as a single string, from back, translated to English if in regional language)
  - Address Components:
    - Street (if available, from back, in English)
    - Locality (if available, from back, in English)
    - District (from back, in English)
    - State (from back, in English)
    - PIN Code (from back)

If both front and back images are provided, combine the information from both sides.
If only one side is provided, extract whatever information is available from that side.

Return the data in the following JSON structure:
{
  "name": "string (in English)",
  "fatherName": "string (in English)",
  "dateOfBirth": "string",
  "gender": "string (in English)",
  "aadhaarNumber": "string",
  "address": "string (in English)",
  "addressComponents": {
    "street": "string (in English)",
    "locality": "string (in English)",
    "district": "string (in English)",
    "state": "string (in English)",
    "pinCode": "string"
  }
}

Only return the JSON object, nothing else. For any fields that cannot be extracted from the provided image(s), use an empty string. Ensure all text fields are in English, translating from any regional languages that may appear on the card.`;