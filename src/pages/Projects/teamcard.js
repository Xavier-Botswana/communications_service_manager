import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Col,
  Card,
  CardBody,
  CardTitle,
  Progress,
  UncontrolledTooltip,
  Media,
  Badge,
} from "reactstrap";
import TopCities from "../Dashboard/TopCities";

const CardProject = (props) => {
  const [hasError, setErrors] = useState(false);
  const [indeliveries, setDeliveries] = useState([]);

  useEffect(() => {
    fetch(
      "https://sheet.best/api/sheets/60a3969d-8d9e-4b41-80b0-3f359e8dbb6e/tabs/leadsdeliveries"
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
            <Card>
              <CardBody>
                <CardTitle className="mb-4">Team Request</CardTitle>
                <div className="text-center">
                  <div className="mb-4">
                    <i
                      className="bx bx-user-circle

 text-primary display-4"
                    ></i>
                  </div>
                  <h3>ID:{indeliveries.username}</h3>
                  <p>{indeliveries.fullnames}</p>
                  <p>{indeliveries.phone}</p>
                </div>

                <div className="table-responsive mt-4">
                  <table className="table table-centered table-nowrap mb-2">
                    <tbody>
                      <tr>
                        <td style={{ width: "30%" }}>
                          <p className="mb-0">Address: </p>
                        </td>
                        <td style={{ width: "25%" }}>
                          <h5 className="mb-0">{indeliveries.address}</h5>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="mb-0">Omang:</p>
                        </td>
                        <td>
                          <h5 className="mb-0">{indeliveries.omang}</h5>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="mb-0">Location:</p>
                        </td>
                        <td>
                          <h5 className="mb-0">{indeliveries.location}</h5>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="mb-0">Team:</p>
                        </td>
                        <td>
                          <h5 className="mb-0">{indeliveries.team_members}</h5>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <button
                            type="button"
                            className="btn btn-success waves-effect waves-light"
                          >
                            <i className="bx bx-check-double font-size-16 align-middle mr-2"></i>{" "}
                            Accept
                          </button>
                        </td>

                        <td>
                          <button
                            type="button"
                            className="btn btn-danger waves-effect waves-light"
                            style={{ marginLeft: "10px" }}
                          >
                            <i className="bx bx-block font-size-16 align-middle mr-2"></i>{" "}
                            Decline
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
            <CardBody>
              {" "}
              {/** <Header /> 

              <Media>
               

                <Media className="overflow-hidden" body>
                  <h5 className="text-truncate font-size-15">
                    <p>LeaderID: {indeliveries.username}</p>
                  </h5>
                  <br />
                  <div className="team">
                    Full Names: {indeliveries.fullnames}
                  </div>
                  <div className="team">Phone Number: {indeliveries.phone}</div>
        
                  <div className="team">
                    Address: {indeliveries.address}
                  </div>
                  <div className="team">
                    Omang: {indeliveries.omang}
                  </div>
                  <div className="team">
                    Location: {indeliveries.location}
                  </div>
                  <div className="team">
                    Team: {indeliveries.team_members}
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
              */}
            </CardBody>

            {/*
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
            */}
          </Card>
        </Col>
      ))}
    </React.Fragment>
  );
};

export default CardProject;
