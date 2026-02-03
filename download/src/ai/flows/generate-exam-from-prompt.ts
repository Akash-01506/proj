'use server';

/**
 * @fileOverview Exam generation flow.
 *
 * generateExamFromPrompt - A function that generates a draft exam (questions and possible answers) from a prompt.
 * GenerateExamFromPromptInput - The input type for the generateExamFromPrompt function.
 * GenerateExamFromPromptOutput - The return type for the generateExamFromPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateExamFromPromptInputSchema = z.object({
  prompt: z.string().describe('The prompt to generate the exam from.'),
  numberOfQuestions: z.number().describe('The number of questions to generate.'),
});

export type GenerateExamFromPromptInput = z.infer<
  typeof GenerateExamFromPromptInputSchema
>;

const GenerateExamFromPromptOutputSchema = z.object({
  exam: z.string().describe('The generated exam.'),
});

export type GenerateExamFromPromptOutput = z.infer<
  typeof GenerateExamFromPromptOutputSchema
>;

export async function generateExamFromPrompt(
  input: GenerateExamFromPromptInput
): Promise<GenerateExamFromPromptOutput> {
  return generateExamFromPromptFlow(input);
}

const generateExamFromPromptPrompt = ai.definePrompt({
  name: 'generateExamFromPromptPrompt',
  input: {schema: GenerateExamFromPromptInputSchema},
  output: {schema: GenerateExamFromPromptOutputSchema},
  prompt: `You are an expert exam generator. Please generate an exam based on the following prompt, with a specified number of questions.

Prompt: {{{prompt}}}
Number of Questions: {{{numberOfQuestions}}}

Ensure that the exam includes both the questions and possible answers.

Output the full exam:
`,
});

const generateExamFromPromptFlow = ai.defineFlow(
  {
    name: 'generateExamFromPromptFlow',
    inputSchema: GenerateExamFromPromptInputSchema,
    outputSchema: GenerateExamFromPromptOutputSchema,
  },
  async input => {
    const {output} = await generateExamFromPromptPrompt(input);
    return output!;
  }
);
