// SummarizeViolationLogs story implementation.
'use server';

/**
 * @fileOverview Summarizes violation logs for a student, highlighting critical incidents.
 *
 * - summarizeViolationLogs - A function that summarizes the violation logs.
 * - SummarizeViolationLogsInput - The input type for the summarizeViolationLogs function.
 * - SummarizeViolationLogsOutput - The return type for the summarizeViolationLogs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeViolationLogsInputSchema = z.object({
  violationLogs: z.string().describe('The violation logs for a student.'),
});
export type SummarizeViolationLogsInput = z.infer<typeof SummarizeViolationLogsInputSchema>;

const SummarizeViolationLogsOutputSchema = z.object({
  summary: z.string().describe('A summary of the most critical incidents in the violation logs.'),
});
export type SummarizeViolationLogsOutput = z.infer<typeof SummarizeViolationLogsOutputSchema>;

export async function summarizeViolationLogs(input: SummarizeViolationLogsInput): Promise<SummarizeViolationLogsOutput> {
  return summarizeViolationLogsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeViolationLogsPrompt',
  input: {schema: SummarizeViolationLogsInputSchema},
  output: {schema: SummarizeViolationLogsOutputSchema},
  prompt: `You are an AI assistant helping proctors quickly assess the severity of student violations during online exams.

  Please summarize the following violation logs, highlighting the most critical incidents and providing a concise overview of the student's behavior. Focus on the key events and their potential impact on exam integrity.

  Violation Logs:
  {{violationLogs}}
  `,
});

const summarizeViolationLogsFlow = ai.defineFlow(
  {
    name: 'summarizeViolationLogsFlow',
    inputSchema: SummarizeViolationLogsInputSchema,
    outputSchema: SummarizeViolationLogsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
