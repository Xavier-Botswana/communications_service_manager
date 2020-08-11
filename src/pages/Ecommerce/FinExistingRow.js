import React, { useState, useContext } from "react";
import { AuthContext } from "../../AuthProvider";
import firebase from "../../firebase";
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

//SweetAlert
import SweetAlert from "react-bootstrap-sweetalert";

export default function FinExistingRow(props) {
  const { currentUser } = useContext(AuthContext);
  const { request, emoneyexisting, setEmoney } = props;

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
    transact();
  };

  const cancelAction = () => {
    setConfirm_both(false);
  };

  const cancelActionDeny = () => {
    setConfirm_both_deny(false);
  };

  /******************************************************************** */

  const PATCH_URL = `https://sheet.best/api/sheets/60a3969d-8d9e-4b41-80b0-3f359e8dbb6e/tabs/e_money_existing/${
    request.id - 1
  }`;

  const transact = () => {
    // Change status to paid
    fetch(PATCH_URL, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "paid",
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        //    console.log(data);
        const index = emoneyexisting.indexOf(request);
        if (index > -1) {
          setEmoney(
            emoneyexisting.filter((item) => {
              return item !== request;
            })
          );
        }
      })
      .catch((error) => {
        // console.log(error);
      });
    firebase.logAction(
      currentUser.email,
      `Credited e-money for user ${request.username}`
    );
  };

  return (
    <React.Fragment>
      <tr>
        <td>{request.id}</td>
        <td>{request.username}</td>
        <td>{request.phone}</td>

        <td>
          <a href={request.proof} target="_blank" download>
            <Badge color="success">
              <i className="mdi mdi-star mr-1"></i> Click To View Payment
            </Badge>
          </a>
        </td>

        <td>{request.date} </td>
        <td>{Number(request.amount).toFixed(2)} </td>

        <td>
          <button
            onClick={openConfirm}
            type="button"
            className="btn btn-success waves-effect waves-light"
          >
            <i className="bx bx-check-double font-size-16 align-middle mr-2"></i>{" "}
            Transact{" "}
          </button>
        </td>
      </tr>
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
          Confirm e-money credit to user {request.username}?
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
