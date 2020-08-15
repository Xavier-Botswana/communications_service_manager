import React, { useState, useContext } from "react";
import {
  Col,
  Card,
  CardBody,
  CardTitle,
  CardFooter,
  Progress,
  UncontrolledTooltip,
  Media,
  Badge,
} from "reactstrap";
import { AuthContext } from "../../AuthProvider";
//SweetAlert
import SweetAlert from "react-bootstrap-sweetalert";
import firebase from "../../firebase";
export default function OneQuery(props) {
  const { currentUser } = useContext(AuthContext);
  const { enquiry, enquiries, setEnquiries } = props;

  /**SWEET ALERT */

  const [confirm_both, setConfirm_both] = useState(false);
  const [confirm_both_deny, setConfirm_both_deny] = useState(false);
  const [success_dlg, setSuccess_dlg] = useState(false);
  const [dynamic_title, setDynamic_title] = useState("");
  const [dynamic_description, setDynamic_description] = useState("false");

  const openConfirm = () => {
    setConfirm_both(true);
  };

  const openConfirmDeny = () => {
    setConfirm_both_deny(true);
  };

  const close_dlg = () => {
    setSuccess_dlg(false);
  };

  const confirmAction = () => {
    // Action
    setConfirm_both(false);
    setSuccess_dlg(true);
    setDynamic_title("Query Resolved");
    setDynamic_description("Notification message sent.");
    // Proceed to accept
    resolve();
  };

  const cancelAction = () => {
    setConfirm_both(false);
  };

  const cancelActionDeny = () => {
    setConfirm_both_deny(false);
  };

  /******************************************************************** */

  const PATCH_URL = `https://sheet.best/api/sheets/60a3969d-8d9e-4b41-80b0-3f359e8dbb6e/tabs/queries/${
    enquiry.id - 1
  }`;

  const resolve = () => {
    // Change status to paid
    fetch(PATCH_URL, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "resolved",
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        //    console.log(data);
        const index = enquiries.indexOf(enquiry);
        if (index > -1) {
          setEnquiries(
            enquiries.filter((item) => {
              return item !== enquiry;
            })
          );
        }
      })
      .catch((error) => {
        // console.log(error);
      });
    firebase.logAction(
      currentUser.email,
      `Resolved query from user ${enquiry.username}`
    );
  };

  return (
    <React.Fragment>
      <Col xl="6" sm="6">
        <Card>
          <CardBody>
            <CardTitle className="mb-4">ID: {enquiry.id}</CardTitle>
            <div className="text-center">
              <div className="mb-4">{enquiry.date}</div>
            </div>

            <div className="table-responsive mt-4">
              <table className="table table-centered table-nowrap mb-2">
                <tbody>
                  <h5 className="mb-0">
                    {enquiry.username} - {enquiry.phone}
                  </h5>

                  <hr />

                  <p className="mb-0">{enquiry.query}</p>
                </tbody>
              </table>
            </div>
          </CardBody>
          <CardFooter>
            <button
              onClick={openConfirm}
              type="button"
              className="btn btn-success waves-effect waves-light"
            >
              <i className="bx bx-check-double font-size-16 align-middle mr-2"></i>{" "}
              Resolved
            </button>
          </CardFooter>
        </Card>
      </Col>
      {confirm_both ? (
        <SweetAlert
          title="Are you sure?"
          warning
          showCancel
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          onConfirm={confirmAction}
          onCancel={cancelAction}
        >
          User {enquiry.username} query resolved?
        </SweetAlert>
      ) : null}

      {success_dlg ? (
        <SweetAlert success title={dynamic_title} onConfirm={close_dlg}>
          {dynamic_description}
        </SweetAlert>
      ) : null}
    </React.Fragment>
  );
}
