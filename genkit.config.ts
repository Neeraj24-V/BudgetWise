import { googleAI } from '@genkit-ai/googleai';
import { genkit } from 'genkit';

export default genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GEMINI_API_KEY,
    }),
  ],
  logSinks: [],
  enableTracingAndMetrics: true,
});
