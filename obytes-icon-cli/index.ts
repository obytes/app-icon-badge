#!/usr/bin/env node
import { addBadge } from 'app-icon-badge';
import path from 'path';
import { exit } from 'process';
import fs from 'fs';
import { parseBadgeJsonConfigFile } from './parse-badge-json-config-file';


if(process.argv[2] == undefined){
  console.log("Please provide a valid path to the config file");
  exit(1);
}
const configPath = path.resolve(__dirname,process.argv[2]);
const badge = parseBadgeJsonConfigFile(configPath);
if(badge)
addBadge(badge);

/**
 * -dir ./images
 * -images icon.png,adaptive-icon.png
 * -badges banner:staging,ribbon:V1.0.1
 * -output ./images
 * -isAdaptiveIcon true | false
 * -configs 
*/