import { config } from 'dotenv';
config();

import '@/ai/flows/generate-exam-from-prompt.ts';
import '@/ai/flows/summarize-violation-logs.ts';