function findPartner(customer, candidates) {

  if (typeof customer !== 'object' || !Array.isArray(candidates)) {
    return "One or more inputs are invalid";
  }

  return candidates.filter(candidate => {
    return candidate.age >= customer.age &&
      candidate.favoriteGenre === customer.favoriteGenre &&
      candidate.hobbies.some(hobby => customer.hobbies.includes(hobby));
  }).sort((a, b) => a.age - b.age)[0] || null;
}

module.exports = findPartner