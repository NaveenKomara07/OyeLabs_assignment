/*As per the Question number 6 in the Assignment, This is the code of JS: */

const numbers = [1, 2, 3, 4, 5, /* ... */ 99, 100] // array with one missing number

function findMissingNumber(numbers) {
  const n = 100
  const expectedSum = (n * (n + 1)) / 2
  const actualSum = numbers.reduce((sum, num) => sum + num, 0)

  return expectedSum - actualSum
}

const missingNumber = findMissingNumber(numbers)
console.log('The Missing number is:', missingNumber)

//Here we will get the missing number from range 1 to 100
