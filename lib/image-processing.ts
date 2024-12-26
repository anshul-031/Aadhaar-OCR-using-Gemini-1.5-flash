export async function processImage(file: File) {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');

    return {
      base64Image,
      mimeType: file.type,
    };
  } catch (error) {
    throw new Error('Failed to process image file');
  }
}