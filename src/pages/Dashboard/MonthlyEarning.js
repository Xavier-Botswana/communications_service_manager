import React, { useEffect, useState } from "react";

import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";

import ApexRadial from "./ApexRadial";

import firebase from "../../firebase";

const MonthlyEarning = (props) => {
  const [rewardAmount, setRewardAmount] = useState(0);
  const [emoneyAmountNew, setEmoneyAmountNew] = useState(0);
  const [emoneyAmountEx, setEmoneyAmountEx] = useState(0);
  const [emoneyTotal, setEmoneyTotal] = useState(0);

  const [deliveryStatuses, setDeliveryStatuses] = useState([])

  const baseurl = `https://us-central1-gov-communications.cloudfunctions.net/app`

  useEffect(() => {
    fetch(`${baseurl}/api/delivery-status`)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw Error('Error fetching data.')
        }
      })
      .then((statuses) => {
        const email = firebase.auth.currentUser.email

        //
        fetch(`${baseurl}/api/user/${email}`)
          .then((response) => response.json())
          .then((response) => {
            const userDetails = response.data
            // setUserDetails(userDetails)
            // console.log(userDetails)

            let filteredStatuses = statuses.filter((item) => {
              return item.department === userDetails.ministryCode
            })
             console.log(filteredStatuses)
            setDeliveryStatuses(filteredStatuses)
          

            //////////////////////////////
          })
          .catch((error) => {
            
          })
      })
      .catch((error) => {
       
      })
  }, []);

  return (
    <React.Fragment>
      {" "}
      <Card>
        <CardBody>
          <CardTitle className="mb-4">Delivered Messages</CardTitle>
          <Row>
            <Col sm="6">
              <h3>{deliveryStatuses.filter(item => {
                return item.status === 'Delivered'
              }).length}</h3>

              <div className="mt-4"></div>
            </Col>
            <Col sm="6">
              <div className="mt-4 mt-sm-0"></div>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CardTitle className="mb-4">Undelivered Messages</CardTitle>
          <Row>
            <Col sm="6">
              <h3>{deliveryStatuses.filter(item => {
                return item.status !== 'Delivered'
              }).length}</h3>

              <div className="mt-4"></div>
            </Col>
            <Col sm="6">
              <div className="mt-4 mt-sm-0"></div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default MonthlyEarning;
