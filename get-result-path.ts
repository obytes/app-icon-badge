/**
 * @param {string} icon // path to the app icon
 * @param {string} environment // the app environment staging | development | production
 * @returns {string}
 * @function
 * @name getResultPath
 * @description
 * get the result image path based on the app environment.
 * @example
 * getResultPath({
 *  icon: './assets/icon.png',
 * environment: 'development',
 * });
 */

type Params = {
  icon: string;
  environment?: string;
};
export function getResultPath({ icon, environment = 'result' }: Params) {
  const iconPathArray = icon.split('.');
  iconPathArray.splice(iconPathArray.length - 1, 0, environment);
  const resultFilename = iconPathArray.join('.');
  return resultFilename;
}
