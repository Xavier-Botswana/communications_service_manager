const axios = require("axios");

const sendSMS = (to, body) => {
  to = `+267${to}`;
  axios
    .post(
      "https://us-central1-ag-nutrition-hctrhq.cloudfunctions.net/app/sms",
      {
        to: to,
        body: body,
      }
    )
    .catch((error) => {
      console.log(error);
    });
};

export default sendSMS;
