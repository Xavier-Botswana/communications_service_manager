import React, { useState, useCallback, useContext, useEffect } from "react";

import firebase from "../../firebase";

import { AuthContext } from "../../AuthProvider";

import Layout from "../../components/HorizontalLayout";
import { Link } from "react-router-dom";

import AdminLayout from "../../components/AdminLayout";
import FinanceLayout from "../../components/AdminLayout";

import {
  Container,
  Row,
  Col,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Individualreq";

//Import Cards
import CardProject from "./card-project";
import Individualreq from "../../components/Common/Individualreq";

const ProjectsGrid = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [indeliveries, setDeliveries] = useState([]);
  const [hasError, setErrors] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://sheet.best/api/sheets/60a3969d-8d9e-4b41-80b0-3f359e8dbb6e/tabs/individualsdeliveries"
    )
      .then((response) => response.json())
      .then((indeliveries) => {
        indeliveries = indeliveries.map((item) => {
          const i = indeliveries.indexOf(item);
          return { ...item, id: i + 1 };
        });
        let filterdeliveries = indeliveries.filter(function (e) {
          return e.status === null || e.status === "";
        });
        //   console.log(filterdeliveries);
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
          <Individualreq
            title="Individual Requests"
            breadcrumbItem="Team Requests"
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

            {indeliveries.map((item, key) => {
              return (
                <CardProject
                  indeliveriesArr={indeliveries}
                  setDeliveries={setDeliveries}
                  key={key}
                  indeliveries={item}
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

export default ProjectsGrid;
