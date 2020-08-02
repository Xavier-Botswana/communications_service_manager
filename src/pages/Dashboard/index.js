import React, { useState, useCallback, useContext, useEffect } from "react";

import firebase from "../../firebase";

import { AuthContext } from "../../AuthProvider";

import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Media,
  Table,
} from "reactstrap";

import { Link } from "react-router-dom";

//import Charts
import StackedColumnChart from "./StackedColumnChart";

import Layout from "../../components/HorizontalLayout";

import modalimage1 from "../../assets/images/product/img-7.png";
import modalimage2 from "../../assets/images/product/img-4.png";

// Pages Components
import WelcomeComp from "./WelcomeComp";
import MonthlyEarning from "./MonthlyEarning";
import SocialSource from "./SocialSource";
import ActivityComp from "./ActivityComp";
import TopCities from "./TopCities";
import LatestTranaction from "./LatestTranaction";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withNamespaces } from "react-i18next";

const Dashboard = (props) => {
  const [modal, setmodal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const email = [
    { title: "Week", linkto: "#", isActive: false },
    { title: "Month", linkto: "#", isActive: false },
    { title: "Year", linkto: "#", isActive: true },
  ];

  const [hasError, setErrors] = useState(false);

  const [emoney, setEmoney] = useState([]);
  const [newEmoney, setNewEmoney] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [indeliveries, setIndeliveries] = useState([]);
  const [withdrawal, setWithdrawal] = useState([]);

  //fetching The Data from the API to display the number of emoney request
  useEffect(() => {
    setIsLoading(true);
    // Emoney existing fetch
    fetch(
      "https://sheet.best/api/sheets/60a3969d-8d9e-4b41-80b0-3f359e8dbb6e/tabs/e_money_existing",
      {
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
        let filteredemoney = emoney.filter(function (e) {
          return e.status === null || e.status === "";
        });
        setEmoney(filteredemoney);
      })
      .catch((error) => {
        setErrors(error);
      });

    // Emoney new fetch
    setIsLoading(true);
    fetch(
      "https://sheet.best/api/sheets/60a3969d-8d9e-4b41-80b0-3f359e8dbb6e/tabs/e_money_new",
      {
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

      .then((newEmoney) => {
        let filteredemoney = newEmoney.filter(function (e) {
          return e.status === null || e.status === "";
        });
        setNewEmoney(filteredemoney);
      })
      .catch((error) => {
        setErrors(error);
      });

    // team deliveries fetch
    fetch(
      "https://sheet.best/api/sheets/60a3969d-8d9e-4b41-80b0-3f359e8dbb6e/tabs/leadsdeliveries",
      {
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
      .then((deliveries) => {
        let filteredeliveries = deliveries.filter(function (e) {
          return e.status === null || e.status === "";
        });
        setDeliveries(filteredeliveries);
      })
      .catch((error) => {
        setErrors(error);
      });

    // individual deliveries fetch
    fetch(
      "https://sheet.best/api/sheets/60a3969d-8d9e-4b41-80b0-3f359e8dbb6e/tabs/individualsdeliveries",
      {
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
      .then((indeliveries) => {
        let filteredeliveries = indeliveries.filter(function (e) {
          return e.status === null || e.status === "";
        });
        setIndeliveries(filteredeliveries);
      })
      .catch((error) => {
        setErrors(error);
      });

    // withdrawal fetch
    fetch(
      "https://sheet.best/api/sheets/60a3969d-8d9e-4b41-80b0-3f359e8dbb6e/tabs/withdrawal",
      {
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
      .then((withdrawal) => {
        let filteredwithdrawal = withdrawal.filter(function (e) {
          return e.status === null || e.status === "";
        });
        setWithdrawal(filteredwithdrawal);
      })
      .catch((error) => {
        setErrors(error);
      });
  }, []);

  /** USER INFO *********************************/
  const { userDetails } = useContext(AuthContext);

  /******************************************** */

  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Dashboard")}
            breadcrumbItem={props.t("Dashboard")}
          />

          <Row>
            <Col xl="4">
              <WelcomeComp userDetails={userDetails} />
              <MonthlyEarning />
            </Col>
            <Col xl="8">
              <Row>
                <Col md="4">
                  <Card className="mini-stats-wid">
                    <CardBody>
                      <Media>
                        <Media body>
                          <p className="text-muted font-weight-medium">
                            E Money Requests
                          </p>
                          <h4 className="mb-0">
                            {emoney.length + newEmoney.length}
                          </h4>
                        </Media>
                        <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                          <span className="avatar-title">
                            <i className={"bx bx-money " + " font-size-24"}></i>
                          </span>
                        </div>
                      </Media>
                    </CardBody>
                  </Card>
                </Col>

                <Col md="4">
                  <Card className="mini-stats-wid">
                    <CardBody>
                      <Media>
                        <Media body>
                          <p className="text-muted font-weight-medium">
                            Delivery Requests
                          </p>
                          <h4 className="mb-0">
                            {deliveries.length + indeliveries.length}{" "}
                          </h4>
                        </Media>
                        <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                          <span className="avatar-title">
                            <i className={"bx bxs-truck" + " font-size-24"}></i>
                          </span>
                        </div>
                      </Media>
                    </CardBody>
                  </Card>
                </Col>

                <Col md="4">
                  <Card className="mini-stats-wid">
                    <CardBody>
                      <Media>
                        <Media body>
                          <p className="text-muted font-weight-medium">
                            Withdrawal Request
                          </p>
                          <h4 className="mb-0">{withdrawal.length}</h4>
                        </Media>
                        <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                          <span className="avatar-title">
                            <i className={"bx bx-money " + " font-size-24"}></i>
                          </span>
                        </div>
                      </Media>
                    </CardBody>
                  </Card>
                </Col>
              </Row>

              <Card>
                <CardBody>
                  <CardTitle className="mb-4 float-sm-left">
                    Email Sent
                  </CardTitle>
                  <div className="float-sm-right">
                    <ul className="nav nav-pills">
                      {email.map((mail, key) => (
                        <li className="nav-item" key={"_li_" + key}>
                          <Link
                            className={
                              mail.isActive ? "nav-link active" : "nav-link"
                            }
                            to={mail.linkto}
                          >
                            {mail.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="clearfix"></div>
                  <StackedColumnChart />
                </CardBody>
              </Card>
            </Col>
          </Row>

         

          <Row>
            <Col lg="12">
              <LatestTranaction />
            </Col>
          </Row>
        </Container>
      </div>
      <Modal
        isOpen={modal}
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabindex="-1"
        toggle={() => {
          setmodal(!modal);
        }}
      >
        <div className="modal-content">
          <ModalHeader
            toggle={() => {
              setmodal(!modal);
            }}
          >
            Order Details
          </ModalHeader>
          <ModalBody>
            <p className="mb-2">
              Product id: <span className="text-primary">#SK2540</span>
            </p>
            <p className="mb-4">
              Billing Name: <span className="text-primary">Neal Matthews</span>
            </p>

            <div className="table-responsive">
              <Table className="table table-centered table-nowrap">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <div>
                        <img src={modalimage1} alt="" className="avatar-sm" />
                      </div>
                    </th>
                    <td>
                      <div>
                        <h5 className="text-truncate font-size-14">
                          Wireless Headphone (Black)
                        </h5>
                        <p className="text-muted mb-0">$ 225 x 1</p>
                      </div>
                    </td>
                    <td>$ 255</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div>
                        <img src={modalimage2} alt="" className="avatar-sm" />
                      </div>
                    </th>
                    <td>
                      <div>
                        <h5 className="text-truncate font-size-14">
                          Hoodie (Blue)
                        </h5>
                        <p className="text-muted mb-0">$ 145 x 1</p>
                      </div>
                    </td>
                    <td>$ 145</td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <h6 className="m-0 text-right">Sub Total:</h6>
                    </td>
                    <td>$ 400</td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <h6 className="m-0 text-right">Shipping:</h6>
                    </td>
                    <td>Free</td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <h6 className="m-0 text-right">Total:</h6>
                    </td>
                    <td>$ 400</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              color="secondary"
              onClick={() => {
                setmodal(!modal);
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    </Layout>
  );
};

export default withNamespaces()(Dashboard);
