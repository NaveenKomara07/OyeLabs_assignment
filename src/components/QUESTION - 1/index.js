/*As per the Question number 1 in the Assignment, This is the code in JS: */

const express = require('express')
const mysql = require('mysql')

const app = express()
app.use(express.json())

const dbConfig = {
  host: 'localhost', //for ex - 3000 is our localhost according to the assignment question
  user: 'your_username', //for ex- username is Naveen
  password: 'your_password', //for ex- password is Naveen@34
  database: 'your_database', //let us assume database id Customer.db
}

// Creating a connection pool
const pool = mysql.createPool(dbConfig)

// API for phone number login
app.post('/login', (request, response) => {
  const phoneNumber = request.body.phone_number

  // Perform phone number validation (you can implement your own logic here)
  if (!phoneNumber) {
    return response.status(400).json({error: 'Phone number is required'})
  }

  pool.getConnection((error, connection) => {
    if (error) {
      console.error(error)
      return response.status(500).json({error: 'An error occurred'})
    }

    connection.query(
      'SELECT * FROM users WHERE phone_number = ?',
      [phoneNumber],
      (error, results) => {
        connection.release()

        if (error) {
          console.error(error)
          return response.status(500).json({error: 'An error occurred'})
        }

        if (results.length === 0) {
          return response.status(404).json({error: 'Phone number not found'})
        }

        return response.json({message: 'Login successful'})
      },
    )
  })
})

// API for adding a customer
app.post('/customers', (request, response) => {
  const customerData = request.body

  // Perform input parameter validation
  if (!customerData || !customerData.name || !customerData.email) {
    return response.status(400).json({error: 'Customer data is required'})
  }

  // Perform duplicate check if necessary
  pool.getConnection((error, connection) => {
    if (error) {
      console.error(error)
      return response.status(500).json({error: 'An error occurred'})
    }

    connection.query(
      'SELECT * FROM customers WHERE email = ?',
      [customerData.email],
      (error, results) => {
        if (error) {
          connection.release()
          console.error(error)
          return response.status(500).json({error: 'An error occurred'})
        }

        if (results.length > 0) {
          connection.release()
          return response
            .status(409)
            .json({error: 'Customer with the provided email already exists'})
        }

        connection.beginTransaction(error => {
          if (error) {
            connection.release()
            console.error(error)
            return response.status(500).json({error: 'An error occurred'})
          }

          // Insert the customer data into the database
          connection.query(
            'INSERT INTO customers (name, email) VALUES (?, ?)',
            [customerData.name, customerData.email],
            (error, results) => {
              if (error) {
                connection.rollback(() => {
                  connection.release()
                  console.error(error)
                  return response.status(500).json({error: 'An error occurred'})
                })
              }

              connection.commit(error => {
                if (error) {
                  connection.rollback(() => {
                    connection.release()
                    console.error(error)
                    return response
                      .status(500)
                      .json({error: 'An error occurred'})
                  })
                }

                connection.release()
                return response.json({message: 'Customer added successfully'})
              })
            },
          )
        })
      },
    )
  })
})

//Running the server in the localhost - 3000

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000/')
})
