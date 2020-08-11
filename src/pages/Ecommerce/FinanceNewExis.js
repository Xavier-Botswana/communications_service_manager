import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Label,
  Input,
  Button,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/BreadcrumbFinanceExis";
import Layout from "../../components/HorizontalLayout";
import { Link } from "react-router-dom";
import FinExistingRow from "./FinExistingRow";

const FinanceEmoneyExisting = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrors] = useState(false);
  const [emoneyexisting, setEmoney] = useState([]);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://sheet.best/api/sheets/60a3969d-8d9e-4b41-80b0-3f359e8dbb6e/tabs/e_money_existing"
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error("Error fetching data.");
        }
      })
      .then((emoneyexisting) => {
        emoneyexisting = emoneyexisting.map((item) => {
          const i = emoneyexisting.indexOf(item);
          return { ...item, id: i + 1 };
        });
        let filteredemoney = emoneyexisting.filter(function (e) {
          return e.status === "accepted";
        });
        //   console.log(filteredemoney);
        setEmoney(filteredemoney);
        setIsLoading(false);
        if (filteredemoney.length === 0) {
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
          <Breadcrumbs
            title=" Existing Emoney Requests"
            breadcrumbItem=" New Emoney Requests"
          />

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

                  <div className="table-responsive">
                    <Table className="table-centered table-nowrap">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Username</th>
                          <th>Phone</th>
                          <th>Proof</th>
                          <th>Date</th>
                          <th>Amount(USD)</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {emoneyexisting.map((item, i) => {
                          return (
                            <FinExistingRow
                              key={i}
                              request={item}
                              emoneyexisting={emoneyexisting}
                              setEmoney={setEmoney}
                            />
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
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
        </Container>
      </div>
    </Layout>
  );
};

export default FinanceEmoneyExisting;
