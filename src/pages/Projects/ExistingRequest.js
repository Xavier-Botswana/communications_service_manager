import React from "react";
import sendSMS from "../../sms.js";

export default function ExistingRequest(props) {
  const { request } = props;

  let PATCH_URL =
    "https://sheet.best/api/sheets/60a3969d-8d9e-4b41-80b0-3f359e8dbb6e/tabs/e_money_existing/phone/*";

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
    const message = `Dear ${request.username}, your e-money request has been approved. Kindly check the portal to confirm that your account has been credited.`;
    sendSMS(request.phone, message);
  };

  const handleDeny = () => {
    // Change status to deny
    PATCH_URL = `${PATCH_URL}${request.phone}*`;
    console.log(`Processing request: ${request.phone}`);
    fetch(PATCH_URL, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "denied",
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
  };

  return (
    <tr>
      <td>11</td>
      <td>
        <h5 className="text-truncate font-size-14">{request.username}</h5>
      </td>
      <td>15 June, 20</td>
      <td> {request.phone} </td>
      <td>
        <a href={request.proof} download>
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
