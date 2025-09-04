/**
 * Clears the object value.
 *
 * @param {*} target 
 */
export const useClearObject = (target) => {
  Object.keys(target).forEach(key => target[key] = '');
};