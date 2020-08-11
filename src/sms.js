import axios from "axios";

async function sendSMS(to, body) {
  to = `+267${to}`;

  const headers = {
    headers: {
      "Content-Type": "application/vnd.example.v1+json",
    },
  };

  await axios
    .post("http://localhost:5000/sms", { to: to, body: body }, headers)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

export default sendSMS;
