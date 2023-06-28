/*As per the Question number 4 in the Assignment, This is the code of JS: */

const person = {
  id: 2,
  gender: 'mail',
}

const student = {
  name: 'ravi',
  email: 'ravi11@yopmail.com',
}

const combinedObject = {
  ...person,
  ...student,
}

console.log(combinedObject)

//Here we will get a new object with all the properties
