/**
 * Returns input type from input element
 * @param input HTML input element
 * @returns input type
 */
export const getInputType = (input: HTMLInputElement) =>
  input.type.toLowerCase();

/**
 * Checks whether item is present in list or not
 * @param array Array list of strings
 * @param item Item to check in list
 * @returns true if item is in array; else false
 */
export const checkInside = (array: string[], item: string) =>
  array.includes(item);
