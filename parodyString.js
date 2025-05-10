function parodyString(string) {
  if (typeof string !== 'string') {
    return 'Input must be a string';
  }
  
  return string.split('').map((char, index) => {
    if (index % 2 === 0) {
      return char.toUpperCase();
    } else {
      return char.toLowerCase();
    }
  }).join('');
}

module.exports = parodyString