import React from "react";

import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Table,
  UncontrolledTooltip,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//Import Image
import img1 from "../../assets/images/companies/img-1.png";
import img2 from "../../assets/images/companies/img-2.png";
import img3 from "../../assets/images/companies/img-3.png";
import img4 from "../../assets/images/companies/img-4.png";
import img5 from "../../assets/images/companies/img-5.png";
import img6 from "../../assets/images/companies/img-6.png";
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import avatar2 from "../../assets/images/users/avatar-2.jpg";
import avatar3 from "../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../assets/images/users/avatar-4.jpg";
import avatar5 from "../../assets/images/users/avatar-5.jpg";
import avatar6 from "../../assets/images/users/avatar-6.jpg";
import avatar7 from "../../assets/images/users/avatar-7.jpg";
import avatar8 from "../../assets/images/users/avatar-8.jpg";

const ProjectsList = (props) => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="E-money Requests"
            breadcrumbItem="Projects List"
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
                        <th scope="col">Sponsor Username</th>
                        <th scope="col">Proof of Payment</th>
                        <th scope="col">Rquest Type</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>11</td>
                        <td>
                          <h5 className="text-truncate font-size-14">
                            Tumelo Moatlhodi
                          </h5>
                          <p className="text-muted mb-0">Elite/Premium/Basic</p>
                        </td>
                        <td>15 June, 20</td>
                        <td>72504896</td>
                        <td>NSebina88</td>
                        <td>
                          <span className="badge badge-primary">Completed</span>
                        </td>
                        <td>New/Existing User</td>
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
    </React.Fragment>
  );
};

export default ProjectsList;
