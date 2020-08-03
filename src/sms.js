const sendSMS = (to, body) => {
  to = `+267${to}`;

  fetch("http://localhost:5000/sms", {
    method: "POST",
    mode:"cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ to: to, body: body }),
  })
    .then((response) => response.json())
    .then((data) => {
     // console.log("Success:", data);
    })
    .catch((error) => {
    //  console.error("Error:", error);
    });
};

export default sendSMS;
