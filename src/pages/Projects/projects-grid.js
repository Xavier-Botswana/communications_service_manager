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
  const [indeliveries, setDeliveries] = useState([]);

  const [hasError, setErrors] = useState(false);

  useEffect(() => {
    fetch(
      "https://sheet.best/api/sheets/60a3969d-8d9e-4b41-80b0-3f359e8dbb6e/tabs/individualsdeliveries"
    )
      .then((response) => response.json())
      .then((indeliveries) => {
        let filterdeliveries = indeliveries.filter(function (e) {
          return e.status === null || e.status === "";
        });
     //   console.log(filterdeliveries);
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
          <Individualreq
            title="Individual Requests"
            breadcrumbItem="Team Requests"
          />

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

export default ProjectsGrid;
