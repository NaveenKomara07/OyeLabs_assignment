/*As per the Question number 5 in the Assignment, This is the code of JS: */

const request = require('request')

function getGoogleHomePage() {
  return new Promise((resolve, reject) => {
    request('http://www.google.com', function (error, response, body) {
      if (error) {
        console.error('error:', error)
        reject(error)
        return
      }

      console.log('statusCode:', response && response.statusCode)
      console.log('body:', body)

      resolve(body)
    })
  })
}

getGoogleHomePage()
  .then(result => {
    console.log('RESULT==>', result)
  })
  .catch(error => {
    console.error('ERROR==>', error)
  })
