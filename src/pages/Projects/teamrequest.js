import React, { useState, useCallback, useContext, useEffect } from "react";

import Layout from "../../components/HorizontalLayout";

import firebase from "../../firebase";
import { Link } from "react-router-dom";

import { AuthContext } from "../../AuthProvider";

import {
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

//Import Breadcrumb

//Import Cards
import TeamCard from "./teamcard";
import Teamcrumb from "../../components/Common/Teamreq";

const TeamDeliveries = (props) => {
  const [teamdeliveries, setDeliveries] = useState([]);

  const [hasError, setErrors] = useState(false);

  useEffect(() => {
    fetch(
      "https://sheet.best/api/sheets/60a3969d-8d9e-4b41-80b0-3f359e8dbb6e/tabs/leadsdeliveries"
    )
      .then((response) => response.json())
      .then((teamdeliveries) => {
        let filterdeliveries = teamdeliveries.filter(function (e) {
          return e.status === null || e.status === "";
        });
        console.log(filterdeliveries);
        setDeliveries(filterdeliveries);
      })
      .catch((error) => {
        setErrors(error);
      });
  }, []);

  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Teamcrumb
            title="Team Delivery Requests"
            breadcrumbItem="Individual Delivery Requests"
          />

          <Row>
            {/* Import Cards */}

            {teamdeliveries.map((item, key) => {
              return (
                <TeamCard
                  key={key}
                  teamdeliveries={item}
                  teamdeliveriesArr={teamdeliveries}
                  setDeliveries={setDeliveries}
                />
              );
            })}
          </Row>

          <Row>
            <Col xs="12">
              <div className="text-center my-3">
                <Link to="#" className="text-success">
                  <i className="bx bx-loader bx-spin font-size-18 align-middle mr-2"></i>{" "}
                  Load more{" "}
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export default TeamDeliveries;
