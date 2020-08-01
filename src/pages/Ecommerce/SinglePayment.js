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
      <td>{withdrawal.phone}</td>
      <td>{withdrawal.date}</td>
      <td>{withdrawal.amount}</td>
      <td>{withdrawal.method_payment}</td>
      <td>
                        <a href={withdrawal.proof_of_payment} download>
                          <Badge color="success" >
                            <i className="mdi mdi-star mr-1"></i> Click To View Payment
                          </Badge>
                          </a>
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
