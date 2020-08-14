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
    setDynamic_title("Payment made");
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
        status: "resolve",
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
      <Col xl="12" sm="6">
        <Card>
          <CardBody>
            <CardTitle className="mb-4">ID: {enquiry.id}</CardTitle>
            <div className="text-center">
              <div className="mb-4"></div>
            </div>

            <div className="table-responsive mt-4">
              <table className="table table-centered table-nowrap mb-2">
                <tbody>
                  <tr>
                    <td style={{ width: "30%" }}>
                      <p className="mb-0">Username: </p>
                    </td>
                    <td style={{ width: "25%" }}>
                      <h5 className="mb-0">{enquiry.username}</h5>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "30%" }}>
                      <p className="mb-0">Date: </p>
                    </td>
                    <td style={{ width: "25%" }}>
                      <h5 className="mb-0">{enquiry.date}</h5>
                    </td>
                  </tr>

                  <tr>
                    <td style={{ width: "30%" }}>
                      <p className="mb-0">Phone Number: </p>
                    </td>
                    <td style={{ width: "25%" }}>
                      <h5 className="mb-0">{enquiry.phone}</h5>
                    </td>
                  </tr>

                  <br />
                  <br />
                  <p className="mb-0">{enquiry.query}</p>
                  <br />
                  <tr>
                    <td>
                      <button
                        onClick={openConfirm}
                        type="button"
                        className="btn btn-success waves-effect waves-light"
                      >
                        <i className=""></i> Resolved
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardBody>
          <CardBody>
            <Badge className="font-size-14" color="warning">
              Pending
            </Badge>
          </CardBody>
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
