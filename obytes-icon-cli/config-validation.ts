import z from 'zod';
import path from 'path';
import { fromZodError } from 'zod-validation-error';
import chalk from 'chalk';
import type { Params } from '../types';

const HEX_COLOR_REGEX = /^#[0-9a-fA-F]{6}$/;

const Badge = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('banner'),
    text: z.string(),
    position: z.union([z.literal('top'), z.literal('bottom')]).optional(),
    color: z.union([z.literal('white'), z.literal('black')]).optional(),
    background: z.string().regex(HEX_COLOR_REGEX).optional(),
  }),
  z.object({
    type: z.literal('ribbon'),
    text: z.string(),
    position: z.union([z.literal('left'), z.literal('right')]).optional(),
    color: z.union([z.literal('white'), z.literal('black')]).optional(),
    background: z
      .string({
        invalid_type_error: 'background color should be in hex format',
      })
      .regex(HEX_COLOR_REGEX)
      .optional(),
  }),
]);

const configParamsSchema = z.object({
  icon: z.string(),
  dstPath: z.string().optional(),
  badges: z.array(Badge),
  isAdaptiveIcon: z.boolean().optional(),
});

const badgesArray = z.array(configParamsSchema);

export const validateConfig = (configs: Params[]) => {
  try {
    badgesArray.parse(configs);
  } catch (err) {
    if (err instanceof z.ZodError) {
      const validationError = fromZodError(err);
      console.error(chalk.red(validationError.message));
    }
    return false;
  }
  return true;
};
