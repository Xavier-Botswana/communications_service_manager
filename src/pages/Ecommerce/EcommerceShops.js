import React, { useState, useCallback, useContext, useEffect } from "react";

import firebase from "../../firebase";

import { AuthContext } from "../../AuthProvider";

import { Link } from "react-router-dom";
import { Container, Row, Col, Input } from "reactstrap";

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
  const [message, setMessage] = useState(null);

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
        withdrawal = withdrawal.map((item) => {
          const i = withdrawal.indexOf(item);
          return { ...item, id: i + 1 };
        });
        let filterwithdrawal = withdrawal.filter(function (e) {
          return e.status === null || e.status === "";
        });
        //  console.log(filterwithdrawal);
        setWithdrawal(filterwithdrawal);
        setIsLoading(false);
        if (filterwithdrawal.length === 0) {
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
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Withdrawal Requests" />
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
            {withdrawal.map((item, key) => (
              <CardShop
                withdrawal={item}
                withdrawals={withdrawal}
                setWithdrawal={setWithdrawal}
                key={"_shop_" + key}
              />
            ))}
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

export default EcommerceShops;
