import { FileType } from '@/lib/types/file';
import { ACCEPTED_FILE_TYPES, AcceptedFileType } from '@/lib/constants/file';

export function getFileType(file: File): FileType {
  const fileType = file.type as AcceptedFileType;
  return ACCEPTED_FILE_TYPES.IMAGE.includes(fileType as any) ? 'image' : 'pdf';
}