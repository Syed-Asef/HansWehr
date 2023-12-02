import hw4 from "./mr-aa-indexes";

const Search = (rootLetters) => {
  index = binarySearch(0, hw4.length - 1, hw4, rootLetters);
  return index;
};

const binarySearch = (start, end, hw4, targetRootLetters) => {
  let mid = Math.floor((start + end) / 2);
  if (start > end) {
    mid++;
    return mid;
  }
  if (hw4[mid] == targetRootLetters) {
    return mid;
  } else if (hw4[mid] > targetRootLetters) {
    return binarySearch(0, mid - 1, hw4, targetRootLetters);
  } else {
    return binarySearch(mid + 1, end, hw4, targetRootLetters);
  }
};

export default Search;
