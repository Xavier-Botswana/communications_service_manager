import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Container, Row, Col, Table } from "reactstrap";

import Layout from "../../components/HorizontalLayout";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const ProjectsList = (props) => {
  const [hasError, setErrors] = useState(false);
  const [emoney, setEmoney] = useState([]);

  useEffect(() => {
    fetch(
      "https://sheetsu.com/apis/v1.0su/8d23893fa144/sheets/e_money_existing"
    )
      .then((response) => response.json())
      .then((emoney) => {
        setEmoney(emoney);
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
          <Breadcrumbs
            title="New Requests"
            breadcrumbItem="Existing Requests"
          />

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
                        <th scope="col">Name</th>
                        <th scope="col">Request Date</th>
                        <th scope="col">Phone</th>
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
                                {item.username}
                              </h5>
                            </td>
                            <td>15 June, 20</td>
                            <td> {item.phone} </td>
                            <td>
                              <a href={item.proof} download>
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

export default ProjectsList;
