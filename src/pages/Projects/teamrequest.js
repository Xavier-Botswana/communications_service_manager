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
  Input,
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
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://sheet.best/api/sheets/60a3969d-8d9e-4b41-80b0-3f359e8dbb6e/tabs/leadsdeliveries"
    )
      .then((response) => response.json())
      .then((teamdeliveries) => {
        teamdeliveries = teamdeliveries.map((item) => {
          const i = teamdeliveries.indexOf(item);
          return { ...item, id: i + 1 };
        });
        let filterdeliveries = teamdeliveries.filter(function (e) {
          return e.status === null || e.status === "";
        });
        //console.log(filterdeliveries);
        setDeliveries(filterdeliveries);
        setIsLoading(false);
        if (filterdeliveries.length === 0) {
          setMessage("No results to show");
        }
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
            title="Team Requests"
            breadcrumbItem="Individual Requests"
          />

          <Row className="mb-2">
            <Col sm="4">
              <div className="search-box mr-2 mb-2 d-inline-block">
                <div className="position-relative">
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                  />
                  <i className="bx bx-search-alt search-icon"></i>
                </div>
              </div>
            </Col>
            <Col sm="8">
              <div className="text-sm-right"></div>
            </Col>
          </Row>

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

          {isLoading ? (
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
          ) : null}

          {message ? (
            <Row>
              <Col xs="12">
                <div style={{ color: "#a6b0cf" }} className="text-center my-3">
                  {message}{" "}
                </div>
              </Col>
            </Row>
          ) : null}
        </Container>
      </div>
    </Layout>
  );
};

export default TeamDeliveries;
