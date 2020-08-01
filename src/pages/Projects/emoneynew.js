import React, { useState, useCallback, useContext, useEffect } from "react";

import { Link } from "react-router-dom";
import { Container, Row, Col, Table } from "reactstrap";

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

  const [confirm_both, setConfirm_both] = useState(false);
  const [confirm_both_deny, setConfirm_both_deny] = useState(false);
  const [success_dlg, setSuccess_dlg] = useState(false);
  const [success_msg, setSuccess_msg] = useState(false);
  const [dynamic_title, setDynamic_title] = useState("");
  const [dynamic_description, setDynamic_description] = useState("false");

  const openConfirm = () => {
    setConfirm_both(true);
  };

  const openConfirmDeny = () => {
    setConfirm_both_deny(true);
  };

  const closeConfirm = () => {
    setSuccess_msg(false);
  };

  const close_dlg = () => {
    setSuccess_dlg(false);
  };

  const confirmAction = () => {
    // Action
    setConfirm_both(false);
    setSuccess_dlg(true);
    setDynamic_title("Action complete");
    setDynamic_description("Notification message sent.");
  };

  const cancelAction = () => {
    setConfirm_both(false);
  };

  const confirmActionDeny = () => {
    // Action
    setConfirm_both_deny(false);
    setSuccess_dlg(true);
    setDynamic_title("Action complete");
    setDynamic_description("Notification message sent.");
  };

  const cancelActionDeny = () => {
    setConfirm_both_deny(false);
  };

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
          return e.status === null || e.status === "";
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
                        return <NewRequest key={i} request={item} />;
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
