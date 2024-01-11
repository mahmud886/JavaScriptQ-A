/**
 * Partitions an array into two parts according to a pivot.
 * @param {Array<number>} arr The array to be sorted.
 * @param {number} lo Starting index of the array to partition
 * @param {number} hi Ending index (inclusive) of the array to partition
 * @return {number} The pivot index that was chosen.
 */
function partition(arr, lo, hi) {
  const pivot = arr[hi];
  let i = lo - 1;

  for (let j = lo; j < hi; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  if (arr[hi] < arr[i + 1]) {
    [arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]];
  }

  return i + 1;
}
