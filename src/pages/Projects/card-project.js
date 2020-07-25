import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Col,
  Card,
  CardBody,
  UncontrolledTooltip,
  Media,
  Badge,
} from "reactstrap";

const CardProject = (props) => {
  const [hasError, setErrors] = useState(false);
  const [indeliveries, setDeliveries] = useState([]);

  useEffect(() => {
    fetch(
      "https://sheet.best/api/sheets/60a3969d-8d9e-4b41-80b0-3f359e8dbb6e/tabs/individualsdeliveries"
    )
      .then((response) => response.json())
      .then((indeliveries) => {
        setDeliveries(indeliveries);
      })
      .catch((error) => {
        setErrors(error);
      });
  }, []);

  
  return (
    <React.Fragment>
      {indeliveries.map((indeliveries, key) => (
        <Col xl="4" sm="6" key={"_project_" + key}>
          <Card>
            <CardBody>
              <Media>
                <li className="list-inline-item mr-3" id="dueDate">
                  <i className="bx bx-calendar mr-1"></i> {indeliveries.date}
                  <UncontrolledTooltip placement="top" target="dueDate">
                    {indeliveries.date}
                  </UncontrolledTooltip>
                </li>

                <Media className="overflow-hidden" body>
                  <h5 className="text-truncate font-size-15">
                    ID: {indeliveries.username}
                  </h5>
                  <br />
                  <div className="team">
                    Full Names: {indeliveries.fullnames}
                  </div>
                  <div className="team">Phone Number: {indeliveries.phone}</div>
        
                  <div className="team">
                    Address: {indeliveries.address}
                  </div>
                  <br />
                  <button
                    type="button"
                    className="btn btn-success waves-effect waves-light"
                  >
                    <i className="fas fa-truck font-size-15 align-middle mr-3"></i>{" "}
                    Dispatch
                  </button>
                </Media>
              </Media>
            </CardBody>
            <div className="px-4 py-3 border-top">
              <ul className="list-inline mb-0">
                <li className="list-inline-item">
                  <Badge className="font-size-12" color="warning">
                    Pending
                  </Badge>
                </li>

                <li className="list-inline-item mr-2" id="comments"></li>
              </ul>
            </div>
          </Card>
        </Col>
      ))}
    </React.Fragment>
  );
};

export default CardProject;
