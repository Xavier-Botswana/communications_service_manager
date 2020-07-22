import React from 'react'
import { Link } from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Table,
  } from "reactstrap";

export default function FirebaseLoader() {
    return (
        <Row>
            <Col xs="12">
              <div className="text-center my-3">
                <Link to="#" className="text-success">
                  <i className="bx bx-loader bx-spin font-size-18 align-middle mr-2"></i>{" "}
                  Processing{" "}
                </Link>
              </div>
            </Col>
          </Row>
    )
}
