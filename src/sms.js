const axios = require('axios')

const sendSMS = (to, body) => {
  axios
    .post(
      'https://us-central1-ag-nutrition-hctrhq.cloudfunctions.net/app/api/sms',
      {
        to: to,
        body: body,
      },
    )
    .catch((error) => {
      console.log(error)
    })
}

export default sendSMS
