import React, { useState, useCallback, useContext, useEffect } from "react";

import Layout from "../../components/HorizontalLayout";

import firebase from "../../firebase";

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
        setDeliveries(teamdeliveries);
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
              return <TeamCard key={key} teamdeliveries={item} />;
            })}
          </Row>

          <Row>
            <Col lg="12">
              <Pagination className="pagination pagination-rounded justify-content-center mt-2 mb-5">
                <PaginationItem disabled>
                  <PaginationLink previous href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem active>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">4</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">5</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink next href="#" />
                </PaginationItem>
              </Pagination>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export default TeamDeliveries;
