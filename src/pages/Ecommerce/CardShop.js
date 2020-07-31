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

const CardShop = (props) => {
  const { withdrawal } = props;
  const [amount, setAmount] = useState(0);

  let PATCH_URL_STATUS =
    "https://sheet.best/api/sheets/60a3969d-8d9e-4b41-80b0-3f359e8dbb6e/tabs/withdrawal/status/*";

  let PATCH_URL_AMOUNT =
    "https://sheet.best/api/sheets/60a3969d-8d9e-4b41-80b0-3f359e8dbb6e/tabs/withdrawal/amount/*";

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "amount") {
      setAmount(value);
    }
  };

  const handleAccept = () => {
    // Change status to accepted
    PATCH_URL_STATUS = `${PATCH_URL_STATUS}${withdrawal.Username}*`;
    console.log(`Processing withdrawal: ${withdrawal.Username}`);
    fetch(PATCH_URL_STATUS, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "approved",
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Add amount
    PATCH_URL_AMOUNT = `${PATCH_URL_AMOUNT}${withdrawal.Username}*`;
    console.log(`Adding amount: ${amount} for ${withdrawal.Username}`);
    fetch(PATCH_URL_AMOUNT, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount,
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
    //const message = `Dear ${withdrawal.username}, your e-money withdrawal has been approved. Please confirm so at the portal.`;

    /*

    axios
      .post("http://localhost:5000/sms", { to: "+2675501296", body: message })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
      */
  };

  const handleDeny = () => {};

  return (
    <React.Fragment>
      <Col xl="4" sm="6">
        <Card>
          <Row>
            <Col lg={12}>
              <Card color="white" className="text-black">
                <CardBody>
                  <CardTitle className="mb-4 text-black">
                    <i className="mdi mdi-alert-circle-outline mr-3"></i>
                    Withdrawal Request
                  </CardTitle>
                  <CardText>Username: {withdrawal.Username}</CardText>
                  <CardText>withdrawal Date: {withdrawal.requestdate}</CardText>
                  <Input
                    onChange={onChangeHandler}
                    type="number"
                    placeholder="enter amount"
                    name="amount"
                    id="placement"
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
                        onClick={handleAccept}
                        color="success"
                        className="btn btn-success waves-effect waves-light"
                      >
                        Accept
                      </Button>

                      <Button
                        onClick={handleDeny}
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
    </React.Fragment>
  );
};

export default CardShop;
