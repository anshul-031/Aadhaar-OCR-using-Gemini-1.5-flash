import { NextRequest, NextResponse } from 'next/server';
import { validateFile } from '@/lib/validation/file';
import { processUploadedFile } from '@/lib/api/file/process';
import { processImageWithGemini } from '@/lib/api/gemini/process-image';
import { logger } from '@/lib/utils/logger';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const validation = validateFile(file);
    if (!validation.isValid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { base64Data, mimeType } = await processUploadedFile(file);
    const data = await processImageWithGemini(base64Data, mimeType);

    return NextResponse.json(data);
  } catch (error) {
    logger.error('API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}