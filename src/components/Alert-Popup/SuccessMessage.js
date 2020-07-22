import React from 'react'
import { UncontrolledAlert } from "reactstrap";

export default function SuccessMessage(props) {
    return (
        <UncontrolledAlert color="success" role="alert">
            {props.message}
        </UncontrolledAlert>
    )
}
