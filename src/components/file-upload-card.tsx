'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/language-provider';
import type { Expense } from '@/types';
import { handleFileUpload } from '@/app/actions';

interface FileUploadCardProps {
  onUpload: (expenses: Omit<Expense, 'id'>[]) => void;
}

export function FileUploadCard({ onUpload }: FileUploadCardProps) {
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();
  const { toast } = useToast();

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setLoading(true);

    const reader = new FileReader();
    reader.onload = async (event: ProgressEvent<FileReader>) => {
      try {
        const fileDataUri = event.target?.result as string;
        const result = await handleFileUpload(fileDataUri);
        
        if (result && result.expenses) {
          onUpload(result.expenses);
          toast({
            title: t('uploadSuccess'),
            description: t('expenseCount', result.expenses.length),
          });
        } else {
          throw new Error('Invalid response from server');
        }
      } catch (error) {
        console.error('File upload error:', error);
        toast({
          variant: 'destructive',
          title: t('uploadError'),
        });
      } finally {
        setLoading(false);
      }
    };
    reader.onerror = () => {
        toast({
            variant: 'destructive',
            title: t('uploadError'),
            description: "Error reading file."
        });
        setLoading(false);
    }
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'text/csv': ['.csv'],
      'application/pdf': ['.pdf'],
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('uploadFile')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors ${
            isDragActive ? 'border-primary bg-accent' : ''
          }`}
        >
          <input {...getInputProps()} />
          {loading ? (
            <>
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="mt-2 text-sm text-muted-foreground">{t('processingFile')}</p>
            </>
          ) : (
            <>
              <UploadCloud className="h-10 w-10 text-primary" />
              <p className="mt-2 text-center text-sm text-muted-foreground">{t('uploadInstructions')}</p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
