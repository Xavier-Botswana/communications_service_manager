import React, { useState, useCallback, useContext, useEffect } from "react";

import { Link } from "react-router-dom";
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

import Layout from "../../components/HorizontalLayout";

import firebase from "../../firebase";

import { AuthContext } from "../../AuthProvider";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumbemoneynew";
import NewRequest from "./NewRequest";

const EmoneyNew = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrors] = useState(false);
  const [emoney, setEmoney] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://sheet.best/api/sheets/60a3969d-8d9e-4b41-80b0-3f359e8dbb6e/tabs/e_money_new",{
        mode: "cors",
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error("Error fetching data.");
        }
      })
      .then((emoney) => {
        emoney = emoney.map((item) => {
          const i = emoney.indexOf(item);
          return { ...item, id: i + 1 };
        });
        let filteredemoney = emoney.filter(function (e) {
          return e.status === null || e.status === "";
        });
        //console.log(filteredemoney);
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
          <Breadcrumbs title="New Users" breadcrumbItem="Existing Users" />

          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
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

                  <div className="table-responsive">
                    <Table className="project-list-table table-nowrap table-centered table-borderless">
                      <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Sponsor Username</th>
                          <th scope="col">Phone</th>
                          <th scope="col">Sponsor #</th>
                          <th scope="col">Date</th>

                          <th scope="col">Proof of Payment</th>
                          <th scope="col">Amount</th>

                          <th scope="col">Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {emoney.map((item, i) => {
                          return (
                            <NewRequest
                              key={i}
                              request={item}
                              emoney={emoney}
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

export default EmoneyNew;
