import fs from 'fs';
import type { Params } from '../types';
import {  validateConfig } from './config-validation';



export function parseBadgeJsonConfigFile(filePath:string) {
    let badgeConfig:Params | null= null;
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        badgeConfig = JSON.parse(data);
        if(!badgeConfig || !validateConfig(badgeConfig)) return null;
    }
    catch (err) {
        console.error(err);
        return null;
    }
    return badgeConfig;
}

