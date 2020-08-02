import React from "react";
import { Card, CardBody, CardTitle, Badge, Button } from "reactstrap";
import { Link } from "react-router-dom";

const LatestTranaction = (props) => {
  const transactions = [
    {
      id: "customCheck2",
      orderId: "#1",
      billingName: "mk2300days@hotmail.com",
      Date: "01 Aug, 2020",
      total: "$400",
      badgeClass: "success",
      paymentStatus: "Paid",
      methodIcon: "",
      paymentMethod: "Super Admin",
      link: "#",
    },
    {
      id: "customCheck2",
      orderId: "#2",
      billingName: "amamahupe@gmail.com ",
      Date: "01 Aug, 2020",
      total: "$400",
      badgeClass: "success",
      paymentStatus: "Paid",
      methodIcon: "",
      paymentMethod: "Super Admin",
      link: "#",
    },
    {
      id: "customCheck2",
      orderId: "#3",
      billingName: "ketlhoilwe17@homail.com",
      Date: "01 Aug, 2020",
      total: "$400",
      badgeClass: "success",
      paymentStatus: "Paid",
      methodIcon: "",
      paymentMethod: "Super Admin",
      link: "#",
    },
    {
      id: "customCheck2",
      orderId: "#4",
      billingName: "ksmazongo@gmail.com",
      Date: "01 Aug, 2020",
      total: "$400",
      badgeClass: "success",
      paymentStatus: "Paid",
      methodIcon: "",
      paymentMethod: "Admin",
      link: "#",
    },
    {
      id: "customCheck2",
      orderId: "#5",
      billingName: "marymocu@gmail.com ",
      Date: "01 Aug, 2020",
      total: "$400",
      badgeClass: "success",
      paymentStatus: "Paid",
      methodIcon: "",
      paymentMethod: "Admin",
      link: "#",
    },
    {
      id: "customCheck2",
      orderId: "#6",
      billingName: "keabaitset@gmail.com",
      Date: "01 Aug, 2020",
      total: "$400",
      badgeClass: "success",
      paymentStatus: "Paid",
      methodIcon: "",
      paymentMethod: "Admin",
      link: "#",
    },
    {
      id: "customCheck2",
      orderId: "#7",
      billingName: "oaitse@gmail.com",
      Date: "01 Aug, 2020",
      total: "$400",
      badgeClass: "success",
      paymentStatus: "Paid",
      methodIcon: "",
      paymentMethod: "Admin",
      link: "#",
    },
    {
      id: "customCheck2",
      orderId: "#8",
      billingName: "keabaitset@gmail.com",
      Date: "01 Aug, 2020",
      total: "$400",
      badgeClass: "success",
      paymentStatus: "Paid",
      methodIcon: "",
      paymentMethod: "Admin",
      link: "#",
    },
    {
      id: "customCheck2",
      orderId: "#9",
      billingName: "Marciadinake@gmail.com",
      Date: "01 Aug, 2020",
      total: "$400",
      badgeClass: "success",
      paymentStatus: "Paid",
      methodIcon: "",
      paymentMethod: "Finance",
      link: "#",
    },
    {
      id: "customCheck2",
      orderId: "#10",
      billingName: "mogajanebosa@gmail.com",
      Date: "01 Aug, 2020",
      total: "$400",
      badgeClass: "success",
      paymentStatus: "Paid",
      methodIcon: "",
      paymentMethod: "Finance",
      link: "#",
    },
    {
      id: "customCheck2",
      orderId: "#11",
      billingName: "ogaufingwanasejo@gmail.com",
      Date: "01 Aug, 2020",
      total: "$400",
      badgeClass: "success",
      paymentStatus: "Paid",
      methodIcon: "",
      paymentMethod: "Finance",
      link: "#",
    },
    {
      id: "customCheck2",
      orderId: "#12",
      billingName: "ratigalekgorwe@gmail.com",
      Date: "01 Aug, 2020",
      total: "$400",
      badgeClass: "success",
      paymentStatus: "Paid",
      methodIcon: "",
      paymentMethod: "Finance",
      link: "#",
    },
  ];

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle className="mb-4">Application Users</CardTitle>
          <div className="table-responsive">
            <table className="table table-centered table-nowrap mb-0">
              <thead className="thead-light">
                <tr>
                  <th style={{ width: "20px" }}>
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customCheck1"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheck1"
                      >
                        &nbsp;
                      </label>
                    </div>
                  </th>
                  <th>User ID</th>
                  <th>Email</th>
                  <th>Date Added</th>
                  <th>User Type</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, key) => (
                  <tr key={"_tr_" + key}>
                    <td>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id={transaction.id}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor={transaction.id}
                        >
                          &nbsp;
                        </label>
                      </div>
                    </td>
                    <td>
                      <Link to="#" className="text-body font-weight-bold">
                        {" "}
                        {transaction.orderId}{" "}
                      </Link>{" "}
                    </td>
                    <td>{transaction.billingName}</td>
                    <td>{transaction.Date}</td>

                    <td>
                      <i
                        className={"fab " + transaction.methodIcon + " mr-1"}
                      ></i>{" "}
                      {transaction.paymentMethod}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default LatestTranaction;
