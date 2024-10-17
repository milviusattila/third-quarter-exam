# Description
You have to complete 3 tasks in the corresponding JS files:
  - parodyString -> `parodyString.js`
  - palindromeArray -> `palindromeArray.js`
  - findPartner -> `findPartner.js`

Also, you have to make a frontend for the backend server, found in `backend/index.js`. *More on that later.*

In the first 3 tasks, each function should return a value, depending on the task.

You can run some built-in tests with the `node test.js` command.  
You can run the `.js` files independently with the `node filename.js` command.

*Don't forget to add me (ricsimarta) as a contributor to this repository!*

---

# parodyString
Write a function that gets one string parameter: `string`.  
The function should return a string, made from the parameter, with the following changes:
  - each letter, that is at an **even** index, should be uppercase
  - each letter, that is at an **odd** index, should be lowercase

Examples:  
`parodyString("Hello World!")` should return `HeLlO WoRlD!`  
`parodyString("kismacska")` should return `KiSmAcSkA`

---

# palindromeArray
Write a function, that gets one array parameter: `array`.  
The array is an array of strings, or an empty array.  
The function should check, if the array is a palindrome array, and return a boolean `true` if it is, or `false` if it's not.  
**Don't check if the values are palindromes, only check if the whole array is a palindrome array.**

Examples:  
`palindromeArray(["one", "two", "one"])` should return `true`  
`palindromeArray(["one", "two", "three"])` should return `false`

---

# findPartner
Write a function, that has 2 parameters: `customer` and `candidates`.  
The `customer` is and object, and the `candidates` is an array of objects.  

Example of a `customer` object:
```
{
  age: 29,
  favoriteGenre: "rock",
  hobbies: ["coding", "gaming"]
}
```

Example of a `candidates` array:
```
[
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
```

The function should find the good partners of the customer,  and return the youngest of them.  
We can say that a candidate is a good partner, if:
  - they share the same favorite genre with the customer
  - they have at least one common hobby

The return value of the function should be an `element` of the candidates array, or `null` if no good candidates can be found.

---

# Frontend for the backend

In the backend directory, you will find a server, named `index.js`. It is a working backend server, don't change it.   
You have to install the required packages with the corresponding node command, and then run the server with `node index.js`.

The backend serves the frontend at the http://127.0.0.1:3000 url, with the static files available at the `/public` route.

If you make a **get** request to the `/api/data` endpoint, it returns the content of the `data.json` file.

The `data.json` is an array of user objects.  
Example of a user object:
```
{
  "id": 1,
  "name": "Gipsz Jakab",
  "age": 26,
  "pets": ["Cirmi", "Kormi"]
}
```

Create a frontend with the content of the `data.json`. You have to get the data with `fetch`. You can build the layout according to your taste.

You should only use javascript for the HTML content.

*CSS is not required in this project, but it is not forbidden.*

After the content, there should be a `form`, allowing the user to add new data into the `json`.

The `form` should include `input` elements for the name, age, and pets values, and a submit button.

The `name` should be a string.  
The `age` should be a number.  
The `pets` should be an array of strings, created from the value of the input element.

The `id` is created in the backend.

The forms `submit` event should make a **post** request to the `/api/data/new` endpoint, with the new data attached in the requests body.

Example request body:
```
{
  name: "Márta Richárd",
  age: 29,
  pets: ["Sedó", "Nyafi"]
}
```

**Make sure to collect all the required data in the correct type, or the server will return a bad status code.**

After the server responded with an OK, you should update the DOM, created from the updated content of the `data.json`.

**Do not change the `index.js` or delete the `data.json` file in the backend directory.**

*Don't forget to add me (ricsimarta) as a contributor to this repository!*
