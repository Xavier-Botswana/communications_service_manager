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
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Layout from "../../components/HorizontalLayout";
import { Link } from "react-router-dom";

const EcommerceCustomers = (props) => {
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
        let filteredemoney = emoney.filter(function (e) {

          return e.status === "accepted";
      });
      console.log(filteredemoney);
        setEmoney(filteredemoney);
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
            title="Emoney New Requests"
            breadcrumbItem="Emoney Existing Requests"
          />

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
                    <Table className="table-centered table-nowrap">
                      <thead>
                        <tr>
                          <th>Sponsor Username</th>
                          <th>Sponsor #</th>
                          <th>Phone</th>
                          <th>Payment Link</th>
                          <th>Status</th>
                          <th>Request Date</th>
                          <th>Amount(USD)</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                      {emoney.map((item, i) => {
                        return <tr>
                        <td>{item.sponsor_username}</td>
                        <td>
                          {item.sponsor_contact}
                        </td>
                        
                        <td>{item.phone}</td>
                        <td>
                        <a href={item.proof_of_payment} download>
                          <Badge color="success" >
                            <i className="mdi mdi-star mr-1"></i> Click To View Payment
                          </Badge>
                          </a>
                        </td>
                        <td>{item.status} </td>
                        <td>{item.date} </td>
                        <td>{item.amount} </td>
                        
                        <td>
                          <button
                            type="button"
                            className="btn btn-success waves-effect waves-light"
                          >
                            <i className="bx bx-check-double font-size-16 align-middle mr-2"></i>{" "}
                            Transact{" "}
                          </button>
                        </td>
                        </tr> 
                      })}
                    </tbody>
                    </Table>
                  </div>
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
                </CardBody>
              </Card>
            </Col>
          </Row>

        </Container>
      </div>
    </Layout>
  );
};


export default EcommerceCustomers;
