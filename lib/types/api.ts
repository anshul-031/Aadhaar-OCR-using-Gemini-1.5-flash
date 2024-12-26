import { AadhaarSide } from './file';

export interface FormDataFile extends File {
  readonly lastModified: number;
  readonly name: string;
  readonly size: number;
  readonly type: string;
}

export interface ProcessableFile {
  file: FormDataFile;
  side: AadhaarSide;
}