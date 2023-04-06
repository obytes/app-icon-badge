/**
 * @param {string} iconPath  // path to the app icon
 * @param {string} environment // the app environment staging | development | production
 * @returns {string}
 * @function
 * @name getResultPath
 * @description
 * get the result image path based on the app environment.
 * @example
 * getResultPath({
 *  iconPath: './assets/icon.png',
 * environment: 'development',
 * });
 */

type Params = {
  iconPath: string;
  environment?: string;
};
export function getResultPath({ iconPath, environment = 'result' }: Params) {
  const iconPathArray = iconPath.split('.');
  iconPathArray.splice(iconPathArray.length - 1, 0, environment);
  const resultFilename = iconPathArray.join('.');
  return resultFilename;
}
