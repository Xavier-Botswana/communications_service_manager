import React, { useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, CardTitle, Badge, Button } from "reactstrap";
import { Link } from "react-router-dom";

import firebase from "../../firebase";

const LatestTranaction = (props) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const db = firebase.db.collection("activity_log");

    db.onSnapshot((snapshot) => {
      const retrievedlogs = [];

      snapshot.forEach((doc) => {
        retrievedlogs.push({ ...doc.data(), id: doc.id });
      });

      setLogs(retrievedlogs);
    });
  }, []);

  const data = {
    columns: [
      {
        label: "id",
        field: "id",
        sort: "asc",
        width: 100,
      },
      {
        label: "user",
        field: "user",
        sort: "asc",
        width: 100,
      },
      {
        label: "action",
        field: "action",
        sort: "asc",
        width: 100,
      },
      {
        label: "time",
        field: "time",
        sort: "asc",
        width: 100,
      },
    ],

    rows: logs,
  };

  return (
    <Row>
      <Col className="col-12">
        <Card>
          <CardBody>
            <CardTitle>System Log Of All User Changes </CardTitle>

            <MDBDataTable responsive bordered data={data} exportToCSV />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default LatestTranaction;
