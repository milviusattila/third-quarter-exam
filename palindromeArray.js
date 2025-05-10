function palindromeArray(array) {
  if (!Array.isArray(array)) {
    return "Input is not an array";
  }

  let fromLeft = 0;
  let fromRight = array.length - 1;

  while (fromLeft < fromRight) {
    if (array[fromLeft] !== array[fromRight]) {
      return false;
    }
    fromLeft++;
    fromRight--;
  }
  return true;
}

module.exports = palindromeArray