/**
 * @param {string} icon // path to the app icon
 * @param {string} suffix // by default result but it can be the app environment staging | development | production
 * @returns {string}
 * @function
 * @name getResultPath
 * @description
 * get the result image path based on suffix.
 * @example
 * getResultPath({
 *  icon: './assets/icon.png',
 * suffix: 'development',
 * });
 */

type Params = {
  icon: string;
  suffix?: string;
};
export function getResultPath({ icon, suffix = 'result' }: Params) {
  const iconPathArray = icon.split('.');
  iconPathArray.splice(iconPathArray.length - 1, 0, suffix);
  const resultFilename = iconPathArray.join('.');
  return resultFilename;
}
