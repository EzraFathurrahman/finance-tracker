'use server';

import { intelligentFileParsing, IntelligentFileParsingOutput } from '@/ai/flows/intelligent-file-parsing';

export async function handleFileUpload(fileDataUri: string): Promise<IntelligentFileParsingOutput | null> {
  try {
    const result = await intelligentFileParsing({ fileDataUri });
    return result;
  } catch (error) {
    console.error('Error in intelligentFileParsing flow:', error);
    return null;
  }
}
