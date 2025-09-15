'use server';

/**
 * @fileOverview This flow intelligently parses expense data from CSV, PDF, or image files,
 * identifying expense amounts and descriptions.
 * 
 * - intelligentFileParsing - An async function that orchestrates the file parsing process.
 * - IntelligentFileParsingInput - The expected input schema for the file parsing, including the file data URI.
 * - IntelligentFileParsingOutput - The output schema, providing structured expense data.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import csv from 'csvtojson';

const IntelligentFileParsingInputSchema = z.object({
  fileDataUri: z
    .string()
    .describe(
      "A file (CSV, PDF, or image) of expenses, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type IntelligentFileParsingInput = z.infer<typeof IntelligentFileParsingInputSchema>;

const ExpenseItemSchema = z.object({
  description: z.string().describe('Description of the expense.'),
  amount: z.number().describe('Amount of the expense.'),
});

const IntelligentFileParsingOutputSchema = z.object({
  expenses: z.array(ExpenseItemSchema).describe('Parsed expenses from the file.'),
});
export type IntelligentFileParsingOutput = z.infer<typeof IntelligentFileParsingOutputSchema>;

export async function intelligentFileParsing(
  input: IntelligentFileParsingInput
): Promise<IntelligentFileParsingOutput> {
  return intelligentFileParsingFlow(input);
}

const intelligentFileParsingPrompt = ai.definePrompt({
  name: 'intelligentFileParsingPrompt',
  input: {schema: IntelligentFileParsingInputSchema},
  output: {schema: IntelligentFileParsingOutputSchema},
  prompt: `You are an AI assistant specialized in extracting expense data from user-provided files.

  The user will provide a file in the form of a data URI. This file can be a CSV, PDF, or an image.

  Your task is to:
  1.  Analyze the file and identify columns containing expense descriptions and amounts. If the file is not a CSV, use OCR to extract text and attempt to identify expense data.
  2.  Convert the identified expense data into a structured JSON format as an array of objects, each with "description" and "amount" fields.  Amounts should be converted to a number.
  3.  If the file is an image or PDF, use OCR to extract the text before processing.

  Ensure that the output is a valid JSON and all amounts are represented as numbers.

  Here is the file data: {{media url=fileDataUri}}
  {
    "expenses": [
      {
        "description": "Expense description",
        "amount": 0.00
      }
    ]
  }
  `,
});

const intelligentFileParsingFlow = ai.defineFlow(
  {
    name: 'intelligentFileParsingFlow',
    inputSchema: IntelligentFileParsingInputSchema,
    outputSchema: IntelligentFileParsingOutputSchema,
  },
  async input => {
    //const fileContent = Buffer.from(input.fileDataUri.split(',')[1], 'base64').toString('utf-8');
    //console.log('fileContent', fileContent)
    const {output} = await intelligentFileParsingPrompt(input);
    return output!;
  }
);

