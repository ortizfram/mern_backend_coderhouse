// Spread Rest operators
const person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    email: "john@example.com",
    city: "New York",
    country: "USA",
};
console.log("\nOriginal Array Person: ",person)

// destrucure with ...rest: 
const { firstName, lastName,age, ...contactInfo } = person;
console.log("\ncontactInfo: ",contactInfo)

// merge again with spread
const full_name = {firstName, lastName}
console.log("\nfull_name: ",full_name)
const full_name_and_contact = {...full_name, ...contactInfo}
console.log("\nfull_name_and_contact: ",full_name_and_contact)