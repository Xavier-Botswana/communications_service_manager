import React, { useState, useEffect } from "react";
import { MDBBtn, MDBDataTable } from "mdbreact";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/declinedwithdrawals";
import "./datatables.scss";
import Layout from "../../components/HorizontalLayout";
import firebase from "../../firebase";
import single_query from "./single_query";
import { Link } from "react-router-dom";
import OneQuery from "./oneQuery";

const Queries = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [enquiries, setEnquiries] = useState([]);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://sheet.best/api/sheets/60a3969d-8d9e-4b41-80b0-3f359e8dbb6e/tabs/queries"
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error("Error fetching data.");
        }
      })
      .then((enquiry) => {
        enquiry = enquiry.map((item) => {
          const i = enquiry.indexOf(item);
          return { ...item, id: i + 1 };
        });
        let filterdenquiries = enquiry.filter(function (e) {
          return e.status === null || e.status === "";
        });
        console.log(filterdenquiries);
        setEnquiries(filterdenquiries);

        if (filterdenquiries.length === 0) {
          setMessage("No results to show");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const data = {
    columns: [
      {
        label: "id",
        field: "id",
        sort: "asc",
        width: 100,
      },
      {
        label: "date",
        field: "date",
        sort: "asc",
        width: 100,
      },
      {
        label: "username",
        field: "username",
        sort: "asc",
        width: 100,
      },
      {
        label: "phone",
        field: "phone",
        sort: "asc",
        width: 100,
      },
      {
        label: "query",
        field: "query",
        sort: "asc",
        width: 100,
      },
    ],

    rows: enquiries,
  };

  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Enquiries" />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  {/**
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
                   */}

                  <Row>
                    {/* Import Cards */}

                    {enquiries.map((item, key) => {
                      return (
                        <OneQuery
                          enquiries={enquiries}
                          enquiry={item}
                          setEnquiries={setEnquiries}
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
                        <div
                          style={{ color: "#a6b0cf" }}
                          className="text-center my-3"
                        >
                          {message}{" "}
                        </div>
                      </Col>
                    </Row>
                  ) : null}
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/**
           <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <MDBDataTable responsive bordered data={data} exportToCSV />
                </CardBody>
              </Card>
            </Col>
          </Row>
           */}
        </div>
      </div>
    </Layout>
  );
};

export default Queries;
