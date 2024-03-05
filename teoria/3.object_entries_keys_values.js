/** 
 * Object.entries
 * Object.keys
 * Object.values
 * 
 * Of an array
 * */ 

const person = {
    name: 'John',
    age: 30,
    city: 'New York'
  };
  
  // entries
  const entries = Object.entries(person);
  console.log(entries); // returns same object

  //keys
  const keys = Object.keys(person);
console.log(keys); // Output: ['name', 'age', 'city']

//values
const values = Object.values(person);
console.log(values); // Output: ['John', 30, 'New York']
  