/**
 * Returns input type
 * @param input HTML input element
 * @returns type in lowercase
 */
export const getInputType = (input: HTMLInputElement) =>
  input.type.toLowerCase();

/**
 * Returns input tagname
 * @param input HTML input element
 * @returns tagname in lowercase
 */
export const getTagName = (input: HTMLInputElement) =>
  input.tagName.toLowerCase();

/**
 * Checks whether item is present in list or not
 * @param array Array list of strings
 * @param item Item to check in list
 * @returns true if item is in array; else false
 */
export const checkInside = (array: string[], item: string) =>
  array.includes(item);

/**
 * Creates downloadable a tag using blob data
 * @param filename File name to be downloaded as
 * @param blob Blob data
 * @returns "a" tag
 */
export const getDownloadableTag = (
  filename: string,
  blob: Blob
): HTMLAnchorElement => {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  return link;
};

export const bolbBuilder = (data: Object, type: string): Blob => {
  const blobData = JSON.stringify(data, null, 2);
  const blob = new Blob([blobData], { type });
  return blob;
};
