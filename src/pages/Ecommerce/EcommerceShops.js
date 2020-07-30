import React, { useState, useCallback, useContext, useEffect } from "react";

import firebase from "../../firebase";

import { AuthContext } from "../../AuthProvider";

import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

import Layout from "../../components/HorizontalLayout";

import AdminLayout from "../../components/AdminLayout";
import FinanceLayout from "../../components/AdminLayout";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//Import Card
import CardShop from "./CardShop";

const EcommerceShops = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrors] = useState(false);
  const [withdrawal, setWithdrawal] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://sheet.best/api/sheets/60a3969d-8d9e-4b41-80b0-3f359e8dbb6e/tabs/withdrawal"
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error("Error fetching data.");
        }
      })
      .then((withdrawal) => {
        setWithdrawal(withdrawal);
      })
      .catch((error) => {
        setErrors(error);
      });
  }, []);

  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title="Withdrawal Requests"
            breadcrumbItem="Withdrawal Requests"
          />
          <Row>
            {withdrawal.map((withdrawal, key) => (
              <CardShop withdrawal={withdrawal} key={"_shop_" + key} />
            ))}
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

export default EcommerceShops;
