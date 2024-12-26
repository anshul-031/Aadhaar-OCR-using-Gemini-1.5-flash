export const AADHAAR_EXTRACTION_PROMPT = `Extract the following information from this Aadhaar card image in JSON format:
  - Name
  - Father's Name
  - Date of Birth
  - Gender
  - Aadhaar Number
  - Address
  Only return the JSON object, nothing else. Ensure all fields are present in the response.`;