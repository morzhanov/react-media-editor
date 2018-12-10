export const includes = (array, value) => {
  const length = array == null ? 0 : array.length
  return !!length && Array.indexOf(array, value, 0) > -1
}
