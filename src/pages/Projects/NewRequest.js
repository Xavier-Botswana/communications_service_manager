import React, { useEffect, useState } from "react";
import axios from "axios";
import sendSMS from "../../sms";
import FirebaseLoader from "../../components/Loader/FirebaseLoader";
import { Button } from "reactstrap";

//SweetAlert
import SweetAlert from "react-bootstrap-sweetalert";

export default function NewRequest(props) {
  const { request } = props;
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

  let PATCH_URL =
    "https://sheet.best/api/sheets/60a3969d-8d9e-4b41-80b0-3f359e8dbb6e/tabs/e_money_new/phone/*";

  const handleAccept = () => {
    setIsLoading(true);
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
    const message = `Dear AG Nutrition sponsor ${request.sponsor_username}, your e-money request has been approved. Kindly visit the portal to register new user.`;

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
    const message = `Dear AG Nutrition sponsor ${request.sponsor_username}, your e-money request has been declined. Kindly contact support for more details.`;

    sendSMS(request.phone, message);
  };

  return (
    <React.Fragment>
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
            onClick={openConfirm}
            type="button"
            className="btn btn-success waves-effect waves-light"
          >
            <i className="bx bx-check-double font-size-16 align-middle mr-2"></i>{" "}
            Accept
          </button>

          {/************************ */}

          <Button color="primary" onClick={openConfirm} id="sa-params">
            Acc
          </Button>

          <button
            onClick={openConfirmDeny}
            type="button"
            className="btn btn-danger waves-effect waves-light"
            style={{ marginLeft: "10px" }}
          >
            <i className="bx bx-block font-size-16 align-middle mr-2"></i> Deny
          </button>

          <Button color="primary" onClick={openConfirmDeny} id="sa-params">
            Den
          </Button>
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
          Accept user {request.sponsor_username} e-money request?
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
          Decline user {request.sponsor_username} e-money request?
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
