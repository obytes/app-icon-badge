#!/usr/bin/env node
import { addBadge } from 'app-icon-badge';
import path from 'path';
import { exit } from 'process';
import fs from 'fs';
import { parseBadgeJsonConfigFile } from './parse-badge-json-config-file';


if(process.argv[2] == undefined){
  console.log("Please provide environment name as argument");
  exit(1);
}
const badge = parseBadgeJsonConfigFile(process.argv[2]);
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