import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Col,
  Row,
  CardText,
  Input,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Container,
} from "reactstrap";
import {
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonDropdown,
} from "reactstrap";

import sendSMS from "../../sms";

//SweetAlert
import SweetAlert from "react-bootstrap-sweetalert";

const CardShop = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { withdrawal, withdrawals, setWithdrawal } = props;
  const [amount, setAmount] = useState(0);

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
    "https://sheet.best/api/sheets/60a3969d-8d9e-4b41-80b0-3f359e8dbb6e/tabs/withdrawal/Username/*";

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "amount") {
      setAmount(value);
    }
  };

  const handleAccept = () => {
    // Change status to accepted
    PATCH_URL = `${PATCH_URL}${withdrawal.Username}*`;
    //  console.log(`Processing request: ${withdrawal.Username}`);
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
        //console.log(data);
      })
      .catch((error) => {
        // console.log(error);
      });

    // Add amount to pay (Converted from USD to BWP)
    // console.log(`Adding amount: ${amount * 12} for ${withdrawal.Username}`);
    fetch(PATCH_URL, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount * 12,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        //  console.log(data);
        const index = withdrawals.indexOf(withdrawal);
        if (index > -1) {
          setWithdrawal(
            withdrawals.filter((item) => {
              return item !== withdrawal;
            })
          );
        }
      })
      .catch((error) => {
        // console.log(error);
      });

    const message = `Dear ${withdrawal.Username}, your withdrawal request has been approved. You will receive your payment in the next 3 working days.`;
    sendSMS(withdrawal.phone, message);
  };

  const handleDeny = () => {
    // Change status to declined
    PATCH_URL = `${PATCH_URL}${withdrawal.Username}*`;
    //console.log(`Processing request: ${withdrawal.Username}`);
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
        //  console.log(data);
        const index = withdrawals.indexOf(withdrawal);
        if (index > -1) {
          setWithdrawal(
            withdrawals.filter((item) => {
              return item !== withdrawal;
            })
          );
        }
      })
      .catch((error) => {
        //  console.log(error);
      });

    const message = `Dear ${withdrawal.Username}, your withdrawal request has been denied. Kindly contact support for mmore details.`;
    sendSMS(withdrawal.phone, message);
  };

  return (
    <React.Fragment>
      <Col xl="4" sm="6">
        <Card>
          <Row>
            <Col lg={12}>
              <Card color="black" className="text-black">
                <CardBody>
                  <CardTitle className="mb-4 text-black">
                    <i className="mdi mdi-alert-circle-outline mr-3"></i>
                    ID: {withdrawal.id}
                  </CardTitle>
                  <CardText>Username: {withdrawal.Username}</CardText>
                  <CardText>Phone Number: {withdrawal.phone}</CardText>
                  <CardText>Date: {withdrawal.requestdate}</CardText>
                  <Input
                    onChange={onChangeHandler}
                    type="number"
                    placeholder="enter amount (USD)"
                    name="amount"
                    id="placement"
                    value={amount}
                  />

                  <CardBody>
                    <div className="button-items">
                      <Button
                        color="dark"
                        className="btn btn-link waves-effect"
                      >
                        <a href={withdrawal.Proof_Of_Payment} download>
                          <i className="bx bx-file-blank"> </i>
                        </a>
                      </Button>
                      <Button
                        onClick={openConfirm}
                        color="success"
                        className="btn btn-success waves-effect waves-light"
                      >
                        Accept
                      </Button>

                      <Button
                        onClick={openConfirmDeny}
                        color="danger"
                        className="btn btn-danger waves-effect waves-light"
                      >
                        Decline
                      </Button>
                    </div>
                  </CardBody>
                </CardBody>
              </Card>
            </Col>
          </Row>
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
          Accept withdarwal request from user {withdrawal.Username}?
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
          Decline withdarwal request from user {withdrawal.Username}?
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

export default CardShop;
