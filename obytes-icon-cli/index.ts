#!/usr/bin/env node
import { addBadge } from 'app-icon-badge';
import path from 'path';
import { exit } from 'process';
import fs from 'fs';

import { parseArgument } from './parse-arguments';


parseArgument(process.argv);
