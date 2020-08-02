import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Col,
  Card,
  CardBody,
  CardTitle,
  CardFooter,
  Progress,
  UncontrolledTooltip,
  Media,
  Badge,
} from "reactstrap";
import TopCities from "../Dashboard/TopCities";

//SweetAlert
import SweetAlert from "react-bootstrap-sweetalert";

import sendSMS from "../../sms.js";

const CardProject = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { teamdeliveries, teamdeliveriesArr, setDeliveries } = props;

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
    handleDispatch();
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
    handleDecline();
  };

  const cancelActionDeny = () => {
    setConfirm_both_deny(false);
  };

  /******************************************************************** */

  let PATCH_URL =
    "https://sheet.best/api/sheets/60a3969d-8d9e-4b41-80b0-3f359e8dbb6e/tabs/leadsdeliveries/phone/*";

  const handleDispatch = () => {
    // Dispatch delivery
    PATCH_URL = `${PATCH_URL}${teamdeliveries.phone}*`;
    console.log(`Processing request: ${teamdeliveries.phone}`);
    fetch(PATCH_URL, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "dispatched",
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        const index = teamdeliveriesArr.indexOf(teamdeliveries);
        if (index > -1) {
          setDeliveries(
            teamdeliveriesArr.filter((item) => {
              return item !== teamdeliveries;
            })
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // Send SMS confirmation
    const message = `Dear AG Nutrition ${teamdeliveries.username}, your team delivery has been dispatched for delivery.`;
    sendSMS(teamdeliveries.phone, message);
  };

  const handleDecline = () => {
    // Deny delivery
    PATCH_URL = `${PATCH_URL}${teamdeliveries.phone}*`;
    console.log(`Processing request: ${teamdeliveries.phone}`);
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
        const index = teamdeliveriesArr.indexOf(teamdeliveries);
        if (index > -1) {
          setDeliveries(
            teamdeliveriesArr.filter((item) => {
              return item !== teamdeliveries;
            })
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // Send SMS confirmation
    const message = `Dear AG Nutrition ${teamdeliveries.username}, your team delivery request has been declined. Kindly contact support for more details.`;
    sendSMS(teamdeliveries.phone, message);
  };

  return (
    <React.Fragment>
      <Col xl="4" sm="6">
        <Card>
          <CardBody>
            <CardTitle className="mb-4">Team Request</CardTitle>
            <div className="text-center">
              <div className="mb-4"></div>
              <h3>{teamdeliveries.fullnames}</h3>
              <h5 className="mb-0">Username: {teamdeliveries.username}</h5>
            </div>

            <div className="table-responsive mt-4">
              <table className="table table-centered table-nowrap mb-2">
                <tbody>
                  <tr>
                    <td style={{ width: "30%" }}>
                      <p className="mb-0">Delivery Address: </p>
                    </td>
                    <td style={{ width: "25%" }}>
                      <h5 className="mb-0">{teamdeliveries.address}</h5>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "30%" }}>
                      <p className="mb-0">Delivery Type: </p>
                    </td>
                    <td style={{ width: "25%" }}>
                      <h5 className="mb-0">{teamdeliveries.type}</h5>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "30%" }}>
                      <p className="mb-0">Phone Number: </p>
                    </td>
                    <td style={{ width: "25%" }}>
                      <h5 className="mb-0">{teamdeliveries.phone}</h5>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="mb-0">Omang:</p>
                    </td>
                    <td>
                      <h5 className="mb-0">{teamdeliveries.omang}</h5>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="mb-0">Location:</p>
                    </td>
                    <td>
                      <h5 className="mb-0">{teamdeliveries.location}</h5>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="mb-0">Team:</p>
                    </td>
                    <td>
                      <h5 className="mb-0">{teamdeliveries.team_members}</h5>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button
                        onClick={openConfirm}
                        type="button"
                        className="btn btn-success waves-effect waves-light"
                      >
                        <i className="fas fa-truck font-size-15 align-middle mr-3"></i>{" "}
                        Dispatch
                      </button>
                    </td>

                    <td>
                      <button
                        onClick={openConfirmDeny}
                        type="button"
                        className="btn btn-danger waves-effect waves-light"
                        style={{ marginLeft: "10px" }}
                      >
                        <i className="bx bx-block font-size-16 align-middle mr-2"></i>{" "}
                        Decline
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardBody>
          <CardBody>
            <Badge className="font-size-14" color="warning">
              Pending
            </Badge>
          </CardBody>
        </Card>
      </Col>
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
          Dispatch order for user {teamdeliveries.username}?
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
          Decline dispatch for user {teamdeliveries.username}?
        </SweetAlert>
      ) : null}

      {success_dlg ? (
        <SweetAlert success title={dynamic_title} onConfirm={close_dlg}>
          {dynamic_description}
        </SweetAlert>
      ) : null}
    </React.Fragment>
  );
};

export default CardProject;
