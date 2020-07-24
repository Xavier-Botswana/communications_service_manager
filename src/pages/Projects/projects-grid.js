import React, { useState, useCallback, useContext, useEffect } from "react";

import firebase from "../../firebase";

import { AuthContext } from "../../AuthProvider";

import Layout from "../../components/HorizontalLayout";

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
import Breadcrumbs from "../../components/Common/Breadcrumb";

//Import Cards
import CardProject from "./card-project";

const ProjectsGrid = (props) => {
  const { withdrawal } = props;

  /** USER INFO *********************************/
  const { currentUser } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState({});

  const getUserDetails = (currentUser) => {
    let docRef = firebase.db.collection("users").doc(currentUser.email);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setUserDetails(doc.data());
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

    return userDetails.userType;
  };

  const userType = getUserDetails(currentUser);

  /******************************************** */

  return (
    <Layout userType={userType}>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Individual Requests"
            breadcrumbItem="Team Requests"
          />

          <Row>
            {/* Import Cards */}
            <CardProject projects={withdrawal} />
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

export default ProjectsGrid;
