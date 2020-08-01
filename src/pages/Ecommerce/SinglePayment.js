import React, { useEffect, useState } from "react";
import { Button, Badge } from "reactstrap";

export default function SinglePayment(props) {
  const [isLoading, setIsLoading] = useState(false);
  let { withdrawal } = props;

  const handlePaymentMade = () => {
    // Notify that payment has been processed
  };

  return (
    <tr>
      <td>{withdrawal.Username}</td>
      <td>{withdrawal.requestdate}</td>
      <td>{withdrawal.amount}</td>
      <td>{withdrawal.paymentMethod}</td>
      <td>
        <Badge className="font-size-12 badge-soft-" color="pending" pill>
          {withdrawal.status}
        </Badge>
      </td>

      <td>
        <Button
          onClick={handlePaymentMade}
          color="success"
          className="btn btn-success waves-effect waves-light"
        >
          <i className="bx bx-check-double font-size-16 align-middle mr-2"></i>{" "}
          Payment Made
        </Button>
      </td>
    </tr>
  );
}
