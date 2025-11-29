import { getResultPath } from './get-result-path';
import { Params } from '../types';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

/**
 * Synchronous version of addBadge for use in Expo config plugins
 * This ensures files are written before the config is updated
 * Uses execSync with the built CLI to avoid module loading issues
 */
export function addBadgeSync({
  icon,
  dstPath,
  isAdaptiveIcon = false,
  badges = [],
}: Params): string {
  const resultFilename = dstPath
    ? dstPath
    : getResultPath({
        icon: icon,
      });

  // Ensure the directory exists
  const dir = path.dirname(resultFilename);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Simple fallback: just copy original file first
  try {
    fs.copyFileSync(icon, resultFilename);
  } catch (error) {
    console.warn('Failed to copy icon:', error);
    return resultFilename;
  }

  // Apply badges sequentially, each building on the previous result
  try {
    let currentInputFile = path.resolve(icon);
    
    for (let i = 0; i < badges.length; i++) {
      const badge = badges[i];
      
      let cmd = `node "${path.resolve(__dirname, '../dist/cli.js')}" "${currentInputFile}" -t ${badge?.type} -x "${badge?.text}" -c ${badge?.color || 'white'}`;
      
      if (badge?.background) {
        cmd += ` -b "${badge.background}"`;
      }
      
      if (badge?.position) {
        cmd += ` -p ${badge.position}`;
      }
      
      // Execute badge generation
      execSync(cmd, { 
        stdio: 'pipe',
        timeout: 10000,
        cwd: path.dirname(currentInputFile)
      });
      
      // Get the result file
      const resultPath = getResultPath({ icon: currentInputFile });
      if (fs.existsSync(resultPath)) {
        if (i === badges.length - 1) {
          // Last badge: copy to final destination
          fs.copyFileSync(resultPath, resultFilename);
          fs.unlinkSync(resultPath);
        } else {
          // Intermediate badge: use result as input for next badge
          // Copy result to a temp file to use as input for next iteration
          const tempFile = path.resolve(path.dirname(resultFilename), `temp-badge-${i}.png`);
          fs.copyFileSync(resultPath, tempFile);
          fs.unlinkSync(resultPath);
          currentInputFile = tempFile;
        }
      }
    }
    
    // Clean up any temp files
    for (let i = 0; i < badges.length - 1; i++) {
      const tempFile = path.resolve(path.dirname(resultFilename), `temp-badge-${i}.png`);
      if (fs.existsSync(tempFile)) {
        fs.unlinkSync(tempFile);
      }
    }
  } catch (error) {
    console.warn('Badge generation failed, using original icon:', error);
    // Original file is already copied, so we're good
    
    // Clean up any temp files on error
    for (let i = 0; i < badges.length; i++) {
      const tempFile = path.resolve(path.dirname(resultFilename), `temp-badge-${i}.png`);
      if (fs.existsSync(tempFile)) {
        fs.unlinkSync(tempFile);
      }
    }
  }

  return resultFilename;
}