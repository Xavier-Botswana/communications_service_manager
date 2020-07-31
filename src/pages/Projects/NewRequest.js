import React, { useEffect, useState } from "react";
import axios from "axios";
import sendSMS from "../../sms";

export default function NewRequest(props) {
  const { request } = props;
  const [isLoading, setIsLoading] = useState(false);

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
    const message = `Dear ${request.username}, your e-money request has been approved. Please confirm so at the portal.`;

    axios
      .post("http://localhost:5000/sms", { to: "+2675501296", body: message })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
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
