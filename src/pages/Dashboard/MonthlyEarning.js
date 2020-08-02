import React from "react";

import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";

import ApexRadial from "./ApexRadial";

const MonthlyEarning = (props) => {
  return (
    <React.Fragment>
      {" "}
      <Card>
        <CardBody>
          <CardTitle className="mb-4">Reward amount to be paid</CardTitle>
          <Row>
            <Col sm="6">
              <p className="text-muted">Converted from dollars</p>
              <h3>P3,600.78</h3>

              <div className="mt-4"></div>
            </Col>
            <Col sm="6">
              <div className="mt-4 mt-sm-0"></div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default MonthlyEarning;
