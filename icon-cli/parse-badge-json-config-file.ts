import fs from 'fs';
import type { Params } from '../types';
import z from 'zod';
import path from 'path';
import { fromZodError } from 'zod-validation-error';
import chalk from 'chalk';
export function parseBadgeJsonConfigFile(filePath:string) {
    let badgeConfig:Params | null= null;
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        badgeConfig = JSON.parse(data);
        if(badgeConfig)
            tryParse(badgeConfig);
    }
    catch (err) {
        console.error(err);
    }
    return badgeConfig;
}

const HEX_COLOR_REGEX = /^#[0-9a-fA-F]{6}$/;
const Badge = z.object({
    type: z.union([
        z.literal('banner',{invalid_type_error:"accepted values banner | ribbon"}),
        z.literal("ribbon",{invalid_type_error:"accepted values banner | ribbon"})]),
    text: z.string(),
    position: z.union([z.literal('left'),z.literal('right')]).optional(),
    color: z.union([z.literal('white'),z.literal('black')]).optional(),
    background: z.string().optional()
})

const ConfigParamsSchema = z.object({
    icon: z.string(),
    dstPath: z.string().optional(),
    badges: z.array(Badge,{invalid_type_error:"badges should be an array of type banner | ribbon"}),
    isAdaptiveIcon: z.boolean().optional()
});


const tryParse = (config:Params) => {

        try
        {
            ConfigParamsSchema.parse(config);
        }catch(err){
            if(err instanceof z.ZodError)
            {
                const validationError = fromZodError(err);
                console.error(chalk.red(validationError.message));
            }
        }
}
/*
export type Ribbon = {
  type: 'ribbon';
  text: string;
  position?: 'left' | 'right';
  color?: 'white' | 'black';
  background?: string;
};

export type Badge = Banner | Ribbon;

export type Params = {
  icon: string;
  dstPath?: string;
  badges: Array<Badge>;
  isAdaptiveIcon?: boolean;
};

*/
