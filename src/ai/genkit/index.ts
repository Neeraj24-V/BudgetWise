/**
 * @fileoverview This file initializes the AI utility. It is used to define flows, prompts, and tools.
 */
import { genkit } from 'genkit';
import config from '../../../genkit.config';
export const ai = genkit(config);
