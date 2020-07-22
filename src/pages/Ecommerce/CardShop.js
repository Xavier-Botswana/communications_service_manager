import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card } from "reactstrap";

const CardShop = (props) => {
  const name = props.shop.name;
  const nameIcon = name.charAt(0);

  return (
    <React.Fragment>
      <Col xl="4" sm="6">
        <Card>
          <Row>
            <Col lx="5">
              <div className="text-center p-4 border-right">
                <div className="avatar-sm mx-auto mb-4">
                  <span
                    className={
                      "avatar-title rounded-circle bg-soft-" +
                      props.shop.color +
                      " primary text-" +
                      props.shop.color +
                      " font-size-16"
                    }
                  >
                    {nameIcon}
                  </span>
                </div>
                <h5 className="text-truncate">Joseph Pule</h5>
              </div>
            </Col>

            <Col xl="7">
              <div className="p-4 text-center text-xl-left">
                <Row>
                  <Col md="6">
                    <div>
                      <p className="text-muted mb-2 text-truncate">Username</p>
                      <h5>jpule122</h5>
                    </div>
                  </Col>
                  <Col md="6">
                    <div>
                      <p className="text-muted mb-2 text-truncate">Balance</p>
                      <h5>P1200.00</h5>
                    </div>
                  </Col>
                </Row>
                <div className="mt-4">
                  <Link to="#">Proof of Reward</Link>
                </div>
                <br />
                <button
                  type="button"
                  className="btn btn-success waves-effect waves-light"
                  style={{ marginBottom: "10px" }}
                >
                  <i className="bx bx-check-double font-size-16 align-middle mr-2"></i>{" "}
                  Accept
                </button>
                <br />
                <button
                  type="button"
                  className="btn btn-danger waves-effect waves-light"
                >
                  <i className="bx bx-block font-size-16 align-middle mr-2"></i>{" "}
                  Decline
                </button>
              </div>
            </Col>
          </Row>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default CardShop;
