/*


**************************************
**************************************
**                                  **
**     DO NOT CHANGE THIS FILE!     **
**                                  **
**************************************
**************************************


*/


const parodyString = require('./parodyString')
const palindromeArray = require('./palindromeArray')
const findPartner = require('./findPartner')

const it = (desc, fn) => {
  try {
    fn()
    console.log('\x1b[32m%s\x1b[0m', '\u2714 ' + desc)
  } catch (err) {
    console.log('\x1b[31m%s\x1b[0m', '\u2718 ' + desc)
    //console.log(err)
  }
}

function assert(condition) {
  if (!condition) {
    throw new Error()
  }
}

console.log('\nparodyString:')
it('should work with lowercase param string', () => {
  assert(parodyString("kismacska") === "KiSmAcSkA")
})
it('should work with uppercase param string', () => {
  assert(parodyString("IAMYELLING") === "IaMyElLiNg")
})
it('should work with mixed param string', () => {
  assert(parodyString("Hello World!") === "HeLlO WoRlD!")
})

console.log('\npalindromeArray:')
it('should return true with one element array', () => {
  assert(palindromeArray(["test"]) === true)
})
it('should return true when the two elements are same', () => {
  assert(palindromeArray(["test", "test"]) === true)
})
it('should return false when the two elements are different', () => {
  assert(palindromeArray(["code", "cool"]) === false)
})
it('should work with an even number of elements', () => {
  assert(palindromeArray(["one", "two", "two", "one"]) === true)
  assert(palindromeArray(["one", "two", "three", "four"]) === false)
  assert(palindromeArray(["one", "two", "three", "one"]) === false)
  assert(palindromeArray(["one", "two", "two", "four"]) === false)
})
it('should work with an odd number of elements', () => {
  assert(palindromeArray(["one", "two", "three", "four", "five"]) === false)
  assert(palindromeArray(["one", "two", "three", "two", "one"]) === true)
  assert(palindromeArray(["one", "two", "three", "four", "one"]) === false)
  assert(palindromeArray(["one", "two", "three", "two", "five"]) === false)
})

const customer = {
  age: 25,
  favoriteGenre: "rock",
  hobbies: ["coding", "gaming"]
}

const candidates1 = [
  {
    age: 35,
    favoriteGenre: "rock",
    hobbies: ["drinking", "fighting", "gaming"]
  },
  {
    age: 31,
    favoriteGenre: "metal",
    hobbies: ["drawing", "photography", "coding"]
  },
  {
    age: 25,
    favoriteGenre: "rock",
    hobbies: ["gaming", "walking", "running"]
  },
  {
    age: 29,
    favoriteGenre: "rock",
    hobbies: ["testing"]
  }
]

const candidates2 = [
  {
    age: 35,
    favoriteGenre: "rock",
    hobbies: ["drinking", "fighting", "gaming"]
  },
  {
    age: 31,
    favoriteGenre: "rock",
    hobbies: ["drawing", "photography", "coding"]
  },
  {
    age: 25,
    favoriteGenre: "metal",
    hobbies: ["gaming", "walking", "running"]
  },
  {
    age: 18,
    favoriteGenre: "rock",
    hobbies: ["testing"]
  }
]

console.log('\nfindPartner:')
it('should return null when no partner is found', () => {
  assert(findPartner(customer, []) === null)
})
it('should return the youngest good candidate', () => {
  assert(findPartner(customer, candidates1).age === 25 && findPartner(customer, candidates1).favoriteGenre === "rock" && findPartner(customer, candidates1).hobbies.includes("gaming"))
  assert(findPartner(customer, candidates2).age === 31 && findPartner(customer, candidates2).favoriteGenre === "rock" && findPartner(customer, candidates2).hobbies.includes("coding"))
})