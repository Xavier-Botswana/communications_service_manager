import React, { useEffect, useState } from "react";
import sendSMS from "../../sms.js";

import { Input } from "reactstrap";

//SweetAlert
import SweetAlert from "react-bootstrap-sweetalert";

export default function ExistingRequest(props) {
  const { request, emoney, setEmoney } = props;
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  /**SWEET ALERT */

  const [confirm_both, setConfirm_both] = useState(false);
  const [confirm_both_deny, setConfirm_both_deny] = useState(false);
  const [success_dlg, setSuccess_dlg] = useState(false);
  const [dynamic_title, setDynamic_title] = useState("");
  const [dynamic_description, setDynamic_description] = useState("false");

  const openConfirm = () => {
    setConfirm_both(true);
  };

  const openConfirmDeny = () => {
    setConfirm_both_deny(true);
  };

  const close_dlg = () => {
    setSuccess_dlg(false);
  };

  const confirmAction = () => {
    // Action
    setConfirm_both(false);
    setSuccess_dlg(true);
    setDynamic_title("Request approved");
    setDynamic_description("Notification message sent.");
    // Proceed to accept
    handleAccept();
  };

  const cancelAction = () => {
    setConfirm_both(false);
  };

  const confirmActionDeny = () => {
    // Action
    setConfirm_both_deny(false);
    setSuccess_dlg(true);
    setDynamic_title("Request denied");
    setDynamic_description("Notification message sent.");
    // Proceed to decline
    handleDeny();
  };

  const cancelActionDeny = () => {
    setConfirm_both_deny(false);
  };

  /******************************************************************** */

  const PATCH_URL = `https://sheet.best/api/sheets/60a3969d-8d9e-4b41-80b0-3f359e8dbb6e/tabs/e_money_existing/${
    request.id - 1
  }`;

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "amount") {
      setAmount(value);
    }
  };

  const handleAccept = () => {
    // Change status to accepted
    fetch(PATCH_URL, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "accepted",
        amount: amount / 14,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        //   console.log(data);
        const index = emoney.indexOf(request);
        if (index > -1) {
          setEmoney(
            emoney.filter((item) => {
              return item !== request;
            })
          );
        }
      })
      .catch((error) => {
        //  console.log(error);
      });

    // Send SMS confirmation
    const message = `Dear AG Nutrition sponsor ${request.username}, your e-money request has been approved. Kindly visit the portal to confirm account credit.`;
    sendSMS(request.phone, message);
  };

  const handleDeny = () => {
    // Change status to deny
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
        //console.log(data);
        const index = emoney.indexOf(request);
        if (index > -1) {
          setEmoney(
            emoney.filter((item) => {
              return item !== request;
            })
          );
        }
      })
      .catch((error) => {
        //  console.log(error);
      });

    // Send SMS confirmation
    const message = `Dear AG Nutrition sponsor ${request.username}, your e-money request has been declined. Kindly contact support for more details.`;
    sendSMS(request.phone, message);
  };

  return (
    <React.Fragment>
      <tr>
        <td>{request.id}</td>
        <td>
          <h5 className="text-truncate font-size-14">{request.username}</h5>
        </td>
        <td>{request.date}</td>
        <td> {request.phone} </td>
        <td>
          <a href={request.proof} download target="_blank">
            <span className="badge badge-primary">Payment Link </span>
          </a>
        </td>
        <td>
          <Input
            onChange={onChangeHandler}
            type="number"
            placeholder="enter amount (BWP)"
            name="amount"
            id="placement"
            value={amount}
          />
        </td>
        <td>
          <button
            onClick={openConfirm}
            type="button"
            className="btn btn-success waves-effect waves-light"
          >
            <i className="bx bx-check-double font-size-16 align-middle mr-2"></i>{" "}
            Accept
          </button>
          <button
            onClick={openConfirmDeny}
            type="button"
            className="btn btn-danger waves-effect waves-light"
            style={{ marginLeft: "10px" }}
          >
            <i className="bx bx-block font-size-16 align-middle mr-2"></i> Deny
          </button>
        </td>
      </tr>
      {confirm_both ? (
        <SweetAlert
          title="Are you sure?"
          warning
          showCancel
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          onConfirm={confirmAction}
          onCancel={cancelAction}
        >
          Accept user {request.username} e-money request?
        </SweetAlert>
      ) : null}

      {confirm_both_deny ? (
        <SweetAlert
          title="Are you sure?"
          warning
          showCancel
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          onConfirm={confirmActionDeny}
          onCancel={cancelActionDeny}
        >
          Decline user {request.username} e-money request?
        </SweetAlert>
      ) : null}

      {success_dlg ? (
        <SweetAlert success title={dynamic_title} onConfirm={close_dlg}>
          {dynamic_description}
        </SweetAlert>
      ) : null}
    </React.Fragment>
  );
}
