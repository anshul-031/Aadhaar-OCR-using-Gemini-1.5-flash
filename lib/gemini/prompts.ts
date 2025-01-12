export const AADHAAR_EXTRACTION_PROMPT = `I will provide you with one or two images of a government ID card. First identify the type of document (Aadhaar Card, PAN Card, Voter ID, Passport, Driving License, or others) and then extract ALL available information from these images and combine them into a single comprehensive response.

IMPORTANT: 
- Always translate and return ALL text in English, regardless of the original language in the document.
- For relationship types:
  * When you see "S/O" or "Son of" in the text, ALWAYS set relationship type as "Father"
  * When you see "D/O" or "Daughter of", set relationship type as "Father"
  * When you see "W/O" or "Wife of", set relationship type as "Husband"
  * When you see "C/O" or "Care of", set relationship type as "Guardian"

Extract and combine the following information from the provided image(s) in JSON format:
  - Document Type (identify which government ID is provided)
  - Name (translated to English if in regional language)
  - Care Of Information:
    - Name of the person (translated to English)
    - Relationship type (MUST be one of: "Father", "Husband", "Guardian")
  - Date of Birth
  - Gender (in English)
  - Aadhaar Number (if Aadhaar card)
  - Address (full address as a single string, translated to English if in regional language)
  - Address Components:
    - Street (if available, in English)
    - Locality (if available, in English)
    - District (in English)
    - State (in English)
    - PIN Code

If both front and back images are provided, combine the information from both sides.
If only one side is provided, extract whatever information is available from that side.

Return the data in the following JSON structure:
{
  "documentType": "string (e.g., 'Aadhaar Card', 'PAN Card', etc.)",
  "name": "string (in English)",
  "careOf": {
    "name": "string (in English)",
    "relationship": "string (MUST be 'Father', 'Husband', or 'Guardian')"
  },
  "dateOfBirth": "string",
  "gender": "string (in English)",
  "aadhaarNumber": "string (only if Aadhaar card)",
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