import React, { useState, useCallback, useContext, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/declinedemoney';
import "./datatables.scss";
import Layout from "../../components/HorizontalLayout";


const DatatableTables = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrors] = useState(false);
  const [emoneynew,setEmoneyNew] = useState([]);
  const [emoneyexist,setEmoneyExist] = useState([]);

  const [message, setMessage] = useState(null);
  let filteredemoneynew;
  let filteredemoneyexist;


  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://sheet.best/api/sheets/60a3969d-8d9e-4b41-80b0-3f359e8dbb6e/tabs/e_money_new",
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
      .then((emoneynew) => {

        filteredemoneynew = emoneynew.filter(function (e) {
         return e.status === "denied";
        });
        setEmoneyNew(filteredemoneynew);
        setIsLoading(false);
        
      })
      .catch((error) => {
        setErrors(error);
      });
  }, []);

 fetch("https://sheet.best/api/sheets/60a3969d-8d9e-4b41-80b0-3f359e8dbb6e/tabs/e_money_existing",
 {
  mode: "cors",
}
 ).then((response) => {
  if (response.ok) {
    return response.json();
  } else {
    throw Error("Error fetching data.");
  }
  })
 .then((emoneyexist) => {

  filteredemoneyexist = emoneyexist.filter(function (e) {
   return e.status === "denied";
  });
  setEmoneyExist(filteredemoneyexist);
  setIsLoading(false);
  
 }) .catch((error) => {
  setErrors(error);
}, []);


 
 
  
   const data = {
      columns: [
        {
          label: "sponsor_username",
          field: "sponsor_username",
          sort: "asc",
          width: 100
        },
        {
          label: "sponsor_contact",
          field: "sponsor_contact",
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
          label: "proof_of_payment",
          field: "proof_of_payment",
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
          label: "date",
          field: "date",
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
      
      rows: emoneynew
        };


        const data2 = {
          columns: [
            {
              label: "username",
              field: "username",
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
              label: "proof",
              field: "proof",
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
              label: "date",
              field: "date",
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
          
          rows: emoneyexist
            };
    return (
      <Layout>
        <div className="page-content">
          <div className="container-fluid">

            <Breadcrumbs title="Emoney Request"  breadcrumbItem="View Deliveries" />

            <Row>
              <Col className="col-12">
                <Card>
                  <CardBody>
                    <CardTitle>Declined New Emoney Request </CardTitle>
                   

                    <MDBDataTable responsive bordered data={data} />


                  </CardBody>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col className="col-12">
                <Card>
                  <CardBody>
                    <CardTitle>Declined Existing Emoney Request</CardTitle>
                   

                    <MDBDataTable responsive striped bordered data={data} />

                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
        </Layout>
      );
    };

export default DatatableTables;
