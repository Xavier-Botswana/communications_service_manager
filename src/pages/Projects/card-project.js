import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sendSMS from "../../sms.js";
import {
  Col,
  Card,
  CardTitle,
  CardBody,
  UncontrolledTooltip,
  Media,
  Badge,
} from "reactstrap";

const CardProject = (props) => {
  const { indeliveries } = props;

  let PATCH_URL =
    "https://sheet.best/api/sheets/60a3969d-8d9e-4b41-80b0-3f359e8dbb6e/tabs/individualsdeliveries/phone/*";

  const handleDispatch = () => {
    // Dispatch delivery
    PATCH_URL = `${PATCH_URL}${indeliveries.phone}*`;
    console.log(`Processing request: ${indeliveries.phone}`);
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
      })
      .catch((error) => {
        console.log(error);
      });

    // Send SMS confirmation
    const message = `Dear ${indeliveries.username}, your delivery request made on date has been dispatched for delivery.`;
    sendSMS(indeliveries.phone, message);
  };

  const handleDecline = () => {
    // Deny delivery
    PATCH_URL = `${PATCH_URL}${indeliveries.phone}*`;
    console.log(`Processing request: ${indeliveries.phone}`);
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
    const message = `Dear ${indeliveries.username}, your delivery request made on date has not been dispatched. Contact support for more detaails.`;
    sendSMS(indeliveries.phone, message);
  };

  return (
    <React.Fragment>
      <Col xl="4" sm="6">
        <Card>
          <CardBody>
            <CardTitle className="mb-4">Individual Request</CardTitle>
            <div className="text-center">
              <div className="mb-4"></div>
              <h3>{indeliveries.fullnames}</h3>
              <h5 className="mb-0">Username: {indeliveries.username}</h5>
            </div>

            <div className="table-responsive mt-4">
              <table className="table table-centered table-nowrap mb-2">
                <tbody>
                  <tr>
                    <td style={{ width: "30%" }}>
                      <p className="mb-0">Delivery Address: </p>
                    </td>
                    <td style={{ width: "25%" }}>
                      <h5 className="mb-0">{indeliveries.address}</h5>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "30%" }}>
                      <p className="mb-0">Delivery Type: </p>
                    </td>
                    <td style={{ width: "25%" }}>
                      <h5 className="mb-0">{indeliveries.type}</h5>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "30%" }}>
                      <p className="mb-0">Phone Number: </p>
                    </td>
                    <td style={{ width: "25%" }}>
                      <h5 className="mb-0">{indeliveries.phone}</h5>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="mb-0">Omang:</p>
                    </td>
                    <td>
                      <h5 className="mb-0">{indeliveries.omang}</h5>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="mb-0">Location:</p>
                    </td>
                    <td>
                      <h5 className="mb-0">{indeliveries.location}</h5>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <button
                        onClick={handleDispatch}
                        type="button"
                        className="btn btn-success waves-effect waves-light"
                      >
                        <i className="fas fa-truck font-size-15 align-middle mr-3"></i>{" "}
                        Dispatch
                      </button>
                    </td>

                    <td>
                      <button
                        onClick={handleDecline}
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
    </React.Fragment>
  );
};

export default CardProject;
