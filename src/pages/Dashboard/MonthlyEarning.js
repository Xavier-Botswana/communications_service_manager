import React, { useEffect, useState } from "react";

import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";

import ApexRadial from "./ApexRadial";

const MonthlyEarning = (props) => {
  const [rewardAmount, setRewardAmount] = useState(0);
  const [emoneyAmountNew, setEmoneyAmountNew] = useState(0);
  const [emoneyAmountEx, setEmoneyAmountEx] = useState(0);
  const [emoneyTotal, setEmoneyTotal] = useState(0);

  useEffect(() => {
    // Reward calculation
    fetch(
      "https://sheet.best/api/sheets/60a3969d-8d9e-4b41-80b0-3f359e8dbb6e/tabs/withdrawal"
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error("Error fetching data.");
        }
      })
      .then((withdrawal) => {
        let filteredwithdrawal = withdrawal.filter(function (e) {
          return e.status === "accepted";
        });
        // Get Amount
        const rewardAmounts = filteredwithdrawal.map((item) => {
          return Number(item.amount);
        });
        const totalReward = rewardAmounts.reduce(
          (accumulator, currentValue) => {
            return accumulator + currentValue;
          },
          0
        );
        setRewardAmount(totalReward.toFixed(2));
      })
      .catch((error) => {});

    // E-money New credit calculation
    fetch(
      "https://sheet.best/api/sheets/60a3969d-8d9e-4b41-80b0-3f359e8dbb6e/tabs/e_money_new"
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error("Error fetching data.");
        }
      })
      .then((emoneynew) => {
        let filteredemoney = emoneynew.filter(function (e) {
          return e.status === "accepted";
        });
        // Get Amount
        const emoneynewAmounts = filteredemoney.map((item) => {
          return Number(item.amount);
        });
        const totalEmoneynew = emoneynewAmounts.reduce(
          (accumulator, currentValue) => {
            return accumulator + currentValue;
          },
          0
        );
        setEmoneyAmountNew(totalEmoneynew.toFixed(2));
      })
      .catch((error) => {});

    // E-money Existing credit calculation
    fetch(
      "https://sheet.best/api/sheets/60a3969d-8d9e-4b41-80b0-3f359e8dbb6e/tabs/e_money_existing"
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error("Error fetching data.");
        }
      })
      .then((emoneyexisting) => {
        let filteredemoneyex = emoneyexisting.filter(function (e) {
          return e.status === "accepted";
        });
        // Get Amount
        const emoneyexAmounts = filteredemoneyex.map((item) => {
          return Number(item.amount);
        });
        const totalEmoneyex = emoneyexAmounts.reduce(
          (accumulator, currentValue) => {
            return accumulator + currentValue;
          },
          0
        );
        setEmoneyAmountEx(totalEmoneyex.toFixed(2));
      })
      .catch((error) => {});
  }, []);

  return (
    <React.Fragment>
      {" "}
      <Card>
        <CardBody>
          <CardTitle className="mb-4">Reward amount to be paid</CardTitle>
          <Row>
            <Col sm="6">
              <h3>{rewardAmount} BWP</h3>

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
          <CardTitle className="mb-4">E-money amount to be credited</CardTitle>
          <Row>
            <Col sm="6">
              <h3>{Number(emoneyAmountEx) + Number(emoneyAmountNew)} USD</h3>

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
