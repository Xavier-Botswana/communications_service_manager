const axios = require("axios");

const sendSMS = (to, body) => {
  to = `+267${to}`;
  axios
    .post("/sms", {
      to: to,
      body: body,
    })
    .catch((error) => {
      console.log(error);
    });
};

export default sendSMS;
