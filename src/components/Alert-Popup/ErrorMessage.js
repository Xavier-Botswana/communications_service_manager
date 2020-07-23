import React from "react";
import { UncontrolledAlert } from "reactstrap";

export default function ErrorMessage(props) {
  return (
    <UncontrolledAlert color="danger" role="alert">
      {props.message}
    </UncontrolledAlert>
  );
}
