/*As per the Question number 3 in the Assignment, This is the code of JS: */

const mysql = require('mysql')

const customers = [
  {
    email: 'anurag11@yopmail.com',
    name: 'anurag',
  },
  {
    email: 'sameer11@yopmail.com',
    name: 'sameer',
  },
  {
    email: 'ravi11@yopmail.com',
    name: 'ravi',
  },
  {
    email: 'akash11@yopmail.com',
    name: 'akash',
  },
  {
    email: 'anjali11@yopmail.com',
    name: 'anjali',
  },
  {
    email: 'santosh11@yopmail.com',
    name: 'santosh',
  },
]

// MySQL database connection configuration
const dbConfig = {
  host: 'localhost', //for ex - 3000 is our localhost according to the assignment question
  user: 'your_username', //for ex- username is Naveen
  password: 'your_password', //for ex- password is Naveen@34
  database: 'your_database', //let us assume database id Customer.db
}

// Create a connection pool
const pool = mysql.createPool(dbConfig)

// Function to insert customers into MySQL
const insertCustomers = () => {
  customers.forEach(customer => {
    pool.getConnection((error, connection) => {
      if (error) {
        console.error(error)
        return
      }
      // Here ? are the values which we have to enter as per the Assignment

      connection.query(
        'SELECT * FROM customers WHERE email = ?',
        [customer.email],
        (error, results) => {
          if (error) {
            connection.release()
            console.error(error)
            return
          }

          if (results.length > 0) {
            //If Email already exists, update the name
            connection.query(
              'UPDATE customers SET name = ? WHERE email = ?',
              [customer.name, customer.email],
              (error, results) => {
                connection.release()
                if (error) {
                  console.error(error)
                  return
                }
                console.log(`Updated name for email: ${customer.email}`)
              },
            )
          } else {
            //If Email does not exist, insert the customer
            connection.query(
              'INSERT INTO customers (name, email) VALUES (?, ?)',
              [customer.name, customer.email],
              (error, results) => {
                connection.release()
                if (error) {
                  console.error(error)
                  return
                }
                console.log(`Inserted customer: ${customer.email}`)
              },
            )
          }
        },
      )
    })
  })
}

insertCustomers()
