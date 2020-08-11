import React, { useState, useCallback, useContext, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/declinedwithdrawals';
import "./datatables.scss";
import Layout from "../../components/HorizontalLayout";


const DeclinedWithdrawals = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrors] = useState(false);
  const [withdrawals,setWithdrawals] = useState([]);
 

  const [message, setMessage] = useState(null);
  let filteredwithdrawals;


  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://sheet.best/api/sheets/60a3969d-8d9e-4b41-80b0-3f359e8dbb6e/tabs/withdrawal",
      {
        mode: "cors",
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error("Error fetching data.");
        }
      })
      .then((withdrawals) => {

        filteredwithdrawals = withdrawals.filter(function (e) {
         return e.status === "denied";
        });
        setWithdrawals(filteredwithdrawals);
        setIsLoading(false);
        
      })
      .catch((error) => {
        setErrors(error);
      });
  }, []);

 

 
 
  
   const data = {
      columns: [
        {
          label: "Username",
          field: "Username",
          sort: "asc",
          width: 100
        },
        {
          label: "Proof_Of_Payment",
          field: "Proof_Of_Payment",
          sort: "asc",
          width: 100
        },
        {
          label: "date",
          field: "date",
          sort: "asc",
          width: 100
        },
        {
          label: "status",
          field: "status",
          sort: "asc",
          width: 100
        },
        {
          label: "phone",
          field: "phone",
          sort: "asc",
          width: 100
        },
       
        
        {
          label: "decline_reason",
          field: "decline_reason",
          sort: "asc",
          width: 270
        }
      ],
      
      rows: withdrawals
        };


    return (
      <Layout>
        <div className="page-content">
          <div className="container-fluid">

            <Breadcrumbs title="Withdrawal Requests"  breadcrumbItem="Declined Requests" />

            <Row>
              <Col className="col-12">
                <Card>
                  <CardBody>
                    <CardTitle>Declined Withdrawal Requests </CardTitle>
                   

                    <MDBDataTable responsive bordered data={data} exportToCSV />


                  </CardBody>
                </Card>
              </Col>
            </Row>

          
          </div>
        </div>
        </Layout>
      );
    };

export default DeclinedWithdrawals;
