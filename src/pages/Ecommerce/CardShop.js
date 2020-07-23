import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row,CardText,Input, Card, CardBody, CardTitle, CardSubtitle,Container } from "reactstrap";
import {
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonDropdown
} from "reactstrap";

const CardShop = (props) => {
  const {withdrawal} = props;

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
                    Request
                  </CardTitle>
  <CardText>UserName:     {withdrawal.Username}</CardText>
  <CardText>RequestDate:  {withdrawal.requestdate}</CardText>
                  <Input
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
                           <a href={withdrawal.Proof_Of_Payment} download><i className="bx bx-file-blank"> </i></a>
                      </Button>
                      <Button
                        color="success"
                        className="btn btn-success waves-effect waves-light"
                      >
                        Accept
                      </Button>

                      <Button
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
