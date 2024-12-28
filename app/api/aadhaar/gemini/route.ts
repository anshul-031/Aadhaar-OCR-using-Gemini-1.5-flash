import { NextRequest, NextResponse } from 'next/server';
import { validateAndMapFiles } from '@/lib/validation/api';
import { processAadhaarFiles } from '@/lib/services/aadhaar';
import { logger } from '@/lib/utils/logger';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files');

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }

    if (files.length > 2) {
      return NextResponse.json(
        { error: 'Maximum 2 files allowed' },
        { status: 400 }
      );
    }

    const processableFiles = validateAndMapFiles(files);
    const data = await processAadhaarFiles(processableFiles);

    return NextResponse.json(data);
  } catch (error) {
    logger.error('API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}