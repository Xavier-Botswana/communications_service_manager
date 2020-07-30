import React from "react";

export default function NewRequest(props) {
  const { request } = props;

  let PATCH_URL =
    "https://sheet.best/api/sheets/60a3969d-8d9e-4b41-80b0-3f359e8dbb6e/tabs/e_money_new/phone/*";

  const handleAccept = () => {
    // Change status to accepted
    PATCH_URL = `${PATCH_URL}${request.phone}*`;
    console.log(`Processing request: ${request.phone}`);
    fetch(PATCH_URL, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "accepted",
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Send SMS confirmation

    const https = require("https");

    let username = "pappiah";
    let password = "@pappiah1";

    let postData = JSON.stringify({
      to: `+267${request.phone}`,
      body: "Hello World!",
    });

    let options = {
      hostname: "api.bulksms.com",
      port: 443,
      mode: "cors",
      path: "/v1/messages",
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "Content-Length": postData.length,
        Authorization:
          "Basic " + Buffer.from(username + ":" + password).toString("base64"),
      },
    };

    let req = https.request(options, (resp) => {
      console.log("statusCode:", resp.statusCode);
      let data = "";
      resp.on("data", (chunk) => {
        data += chunk;
      });
      resp.on("end", () => {
        console.log("Response:", data);
      });
    });

    req.on("error", (e) => {
      console.error(e);
    });

    req.write(postData);
    req.end();
  };

  const handleDeny = () => {
    // Change status to deny
  };

  return (
    <tr>
      <td>11</td>
      <td>
        <h5 className="text-truncate font-size-14">
          {request.sponsor_username}
        </h5>
      </td>
      <td> {request.phone} </td>
      <td>{request.sponsor_contact}</td>
      <td>{request.date}</td>

      <td>
        <a href={request.proof_of_payment} download>
          <span className="badge badge-primary">Payment Link </span>
        </a>
      </td>

      <td>
        <button
          onClick={handleAccept}
          type="button"
          className="btn btn-success waves-effect waves-light"
        >
          <i className="bx bx-check-double font-size-16 align-middle mr-2"></i>{" "}
          Accept
        </button>
        <button
          onClick={handleDeny}
          type="button"
          className="btn btn-danger waves-effect waves-light"
          style={{ marginLeft: "10px" }}
        >
          <i className="bx bx-block font-size-16 align-middle mr-2"></i> Deny
        </button>
      </td>
    </tr>
  );
}
