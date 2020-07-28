import React, { useState, useCallback, useContext, useEffect } from "react";

import { Link } from "react-router-dom";
import { Container, Row, Col, Table } from "reactstrap";

import Layout from "../../components/HorizontalLayout";

import firebase from "../../firebase";

import { AuthContext } from "../../AuthProvider";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumbemoneynew";

const EmoneyNew = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrors] = useState(false);
  const [emoney, setEmoney] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://sheet.best/api/sheets/60a3969d-8d9e-4b41-80b0-3f359e8dbb6e/tabs/e_money_new"
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error("Error fetching data.");
        }
      })
      .then((emoney) => {
        setEmoney(emoney);
      })
      .catch((error) => {
        setErrors(error);
      });
  }, []);

  /** USER INFO *********************************/
  const { currentUser, getUserDetails } = useContext(AuthContext);

  const userDetails = getUserDetails(currentUser);

  /******************************************** */

  return (
    <Layout userType={userDetails.userType}>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="New Users" breadcrumbItem="Existing Users" />

          <Row>
            <Col lg="12">
              <div className="">
                <div className="table-responsive">
                  <Table className="project-list-table table-nowrap table-centered table-borderless">
                    <thead>
                      <tr>
                        <th scope="col" style={{ width: "100px" }}>
                          #
                        </th>
                        <th scope="col">Sponsor</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Sponsor #</th>
                        <th scope="col">Date</th>

                        <th scope="col">Proof of Payment</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {emoney.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td>11</td>
                            <td>
                              <h5 className="text-truncate font-size-14">
                                {item.sponsor_username}
                              </h5>
                            </td>
                            <td> {item.phone} </td>
                            <td>{item.sponsor_contact}</td>
                            <td>{item.date}</td>

                            <td>
                              <a href={item.proof_of_payment} download>
                                <span className="badge badge-primary">
                                  Payment Link{" "}
                                </span>
                              </a>
                            </td>

                            <td>
                              <button
                                type="button"
                                className="btn btn-success waves-effect waves-light"
                              >
                                <i className="bx bx-check-double font-size-16 align-middle mr-2"></i>{" "}
                                Accept
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger waves-effect waves-light"
                                style={{ marginLeft: "10px" }}
                              >
                                <i className="bx bx-block font-size-16 align-middle mr-2"></i>{" "}
                                Deny
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </div>
            </Col>
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

export default EmoneyNew;
