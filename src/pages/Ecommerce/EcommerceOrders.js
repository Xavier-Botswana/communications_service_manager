import React, { useState, useCallback, useContext, useEffect } from "react";

import firebase from "../../firebase";

import { AuthContext } from "../../AuthProvider";

import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Input,
  Button,
  Card,
  CardBody,
  Table,
  Label,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledTooltip,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

import Layout from "../../components/HorizontalLayout";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import img4 from "../../assets/images/product/img-4.png";
import img7 from "../../assets/images/product/img-7.png";
import SinglePayment from "./SinglePayment";

const EcommerceOrders = (props) => {
  const [modal, setmodal] = useState(false);
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

  const Orders = [
    {
      id: "customCheck2",
      orderId: "#SK2540",
      billingName: "Neal Matthews",
      Date: "07 Oct, 2019",
      total: "$400",
      badgeclass: "success",
      paymentStatus: "Paid",
      methodIcon: "fa-cc-mastercard",
      paymentMethod: "Mastercard",
    },
    {
      id: "customCheck3",
      orderId: "#SK2541",
      billingName: "Jamal Burnett",
      Date: "07 Oct, 2019",
      total: "$380",
      badgeclass: "danger",
      paymentStatus: "Chargeback",
      methodIcon: "fa-cc-visa",
      paymentMethod: "Visa",
    },
    {
      id: "customCheck4",
      orderId: "#SK2542",
      billingName: "Juan Mitchell",
      Date: "06 Oct, 2019",
      total: "$384",
      badgeclass: "success",
      paymentStatus: "Paid",
      methodIcon: "fa-cc-paypal",
      paymentMethod: "Paypal",
    },
    {
      id: "customCheck5",
      orderId: "#SK2543",
      billingName: "Barry Dick",
      Date: "05 Oct, 2019",
      total: "$412",
      badgeclass: "success",
      paymentStatus: "Paid",
      methodIcon: "fa-cc-mastercard",
      paymentMethod: "Mastercard",
    },
    {
      id: "customCheck6",
      orderId: "#SK2544",
      billingName: "Ronald Taylor",
      Date: "04 Oct, 2019",
      total: "$404",
      badgeclass: "warning",
      paymentStatus: "Refund",
      methodIcon: "fa-cc-visa",
      paymentMethod: "Visa",
    },
    {
      id: "customCheck7",
      orderId: "#SK2545",
      billingName: "Jacob Hunter",
      Date: "04 Oct, 2019",
      total: "$392",
      badgeclass: "success",
      paymentStatus: "Paid",
      methodIcon: "fa-cc-paypal",
      paymentMethod: "Paypal",
    },
    {
      id: "customCheck8",
      orderId: "#SK2546",
      billingName: "William Cruz",
      Date: "03 Oct, 2019",
      total: "$374",
      badgeclass: "success",
      paymentStatus: "Paid",
      methodIcon: "fas fa-money-bill-alt",
      paymentMethod: "COD",
    },
    {
      id: "customCheck9",
      orderId: "#SK2547",
      billingName: "Dustin Moser",
      Date: "02 Oct, 2019",
      total: "$350",
      badgeclass: "success",
      paymentStatus: "Paid",
      methodIcon: "fa-cc-paypal",
      paymentMethod: "Mastercard",
    },
    {
      id: "customCheck10",
      orderId: "#SK2548",
      billingName: "Clark Benson",
      Date: "01 Oct, 2019",
      total: "$345",
      badgeclass: "warning",
      paymentStatus: "Refund",
      methodIcon: "fa-cc-paypal",
      paymentMethod: "Visa",
    },
  ];

  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Reward Payments"
            breadcrumbItem="Reward Payments"
          />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <Row className="mb-2"></Row>

                  <div className="table-responsive">
                    <Table className="table table-centered table-nowrap">
                      <thead className="thead-light">
                        <tr>
                          <th>Username</th>
                          <th>Date</th>
                          <th>Amount ($)</th>
                          <th>Payment Method</th>
                          <th>Payment Status</th>

                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {withdrawal.map((item, key) => (
                          <SinglePayment key={key} withdrawal={item} />
                        ))}
                      </tbody>
                    </Table>
                  </div>
                  <Pagination className="pagination pagination-rounded justify-content-end mb-2">
                    <PaginationItem disabled>
                      <PaginationLink previous href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem active>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">4</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">5</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink next href="#" />
                    </PaginationItem>
                  </Pagination>
                </CardBody>
              </Card>
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
                        <img src={img7} alt="" className="avatar-sm" />
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
                        <img src={img4} alt="" className="avatar-sm" />
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

export default EcommerceOrders;
