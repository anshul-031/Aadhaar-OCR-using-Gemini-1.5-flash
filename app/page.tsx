'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload, Loader2, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AadhaarDetails } from '@/components/aadhaar-details';
import { AadhaarData } from '@/lib/types';
import { processAadhaarFiles } from '@/lib/services/aadhaar';
import { logger } from '@/lib/utils/logger';
import type { AadhaarSide } from '@/lib/types/file';

export default function Home() {
  const [files, setFiles] = useState<{ file: File; side: AadhaarSide }[]>([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AadhaarData | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, side: AadhaarSide) => {
    if (e.target.files && e.target.files[0]) {
      const newFile = { file: e.target.files[0], side };
      
      if (side === 'complete') {
        setFiles([newFile]);
      } else {
        const otherSide = side === 'front' ? 'back' : 'front';
        const existingOtherFile = files.find(f => f.side === otherSide);
        setFiles(existingOtherFile ? [existingOtherFile, newFile] : [newFile]);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) {
      toast({
        title: 'Error',
        description: 'Please select at least one file',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    logger.info('Starting Aadhaar card processing', { fileCount: files.length });

    try {
      const extractedData = await processAadhaarFiles(files);
      console.log('Extracted Data:', extractedData); // Debug log
      setData(extractedData);
      toast({
        title: 'Success',
        description: 'Successfully extracted Aadhaar details',
      });
    } catch (error) {
      logger.error('Failed to process Aadhaar card', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to extract data',
        variant: 'destructive',
      });
      setData(null); // Reset data on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Aadhaar Card OCR
          </h1>
          <p className="text-lg text-gray-600">
            Upload your Aadhaar card image or PDF to extract information automatically
          </p>
        </div>

        <Card className="p-6 bg-white shadow-lg rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('complete-upload')?.click()}
                  className="w-full"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Upload Complete Aadhaar
                </Button>
                <Input
                  id="complete-upload"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileChange(e, 'complete')}
                  className="hidden"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">Or upload front and back separately</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('front-upload')?.click()}
                    className="w-full"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Front Side
                  </Button>
                  <Input
                    id="front-upload"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange(e, 'front')}
                    className="hidden"
                  />
                </div>
                <div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('back-upload')?.click()}
                    className="w-full"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Back Side
                  </Button>
                  <Input
                    id="back-upload"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange(e, 'back')}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={loading || files.length === 0}
                className="min-w-[200px]"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Extract Details
                  </>
                )}
              </Button>
            </div>
          </form>

          {data && <AadhaarDetails data={data} className="mt-8" />}
        </Card>
      </div>
    </div>
  );
}