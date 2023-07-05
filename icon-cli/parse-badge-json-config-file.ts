import fs from 'fs';
import type { Params } from '../types';
export function parseBadgeJsonConfigFile(filePath:string) {
    let badgeConfig:Params | null= null;
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        badgeConfig = JSON.parse(data);
    }
    catch (err) {
        console.error(err);
    }
    return badgeConfig;
}