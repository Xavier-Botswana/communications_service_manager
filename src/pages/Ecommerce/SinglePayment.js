import React, { useEffect, useState } from "react";
import { Button, Badge } from "reactstrap";

//SweetAlert
import SweetAlert from "react-bootstrap-sweetalert";

export default function SinglePayment(props) {
  const [isLoading, setIsLoading] = useState(false);
  let { withdrawal, withdrawals, setWithdrawal } = props;

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
    setDynamic_description("");
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

  let PATCH_URL =
    "https://sheet.best/api/sheets/60a3969d-8d9e-4b41-80b0-3f359e8dbb6e/tabs/withdrawal/Username/*";

  const transact = () => {
    // Change status to paid
    PATCH_URL = `${PATCH_URL}${withdrawal.Username}*`;
    //console.log(`Processing request: ${withdrawal.Username}`);

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
        const index = withdrawals.indexOf(withdrawal);
        if (index > -1) {
          setWithdrawal(
            withdrawals.filter((item) => {
              return item !== withdrawal;
            })
          );
        }
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  return (
    <React.Fragment>
      <tr>
        <td>{withdrawal.id}</td>
        <td>{withdrawal.Username}</td>
        <td>{withdrawal.phone}</td>
        <td>{withdrawal.date}</td>
        <td>{withdrawal.amount}</td>
        <td>{withdrawal.method_payment}</td>
        <td>
          <a href={withdrawal.proof_of_payment} download>
            <Badge color="success">
              <i className="mdi mdi-star mr-1"></i> Click To View Payment
            </Badge>
          </a>
        </td>

        <td>
          <Button
            onClick={openConfirm}
            color="success"
            className="btn btn-success waves-effect waves-light"
          >
            <i className="bx bx-check-double font-size-16 align-middle mr-2"></i>{" "}
            Transact
          </Button>
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
          Confrim payment made to user {withdrawal.Username}?
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
