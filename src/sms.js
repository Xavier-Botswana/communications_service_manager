import axios from "axios";

const sendSMS = (to, body) => {
  to = `+267${to}`;
  axios
    .post("http://localhost:5000/sms", { to: to, body: body })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default sendSMS;
