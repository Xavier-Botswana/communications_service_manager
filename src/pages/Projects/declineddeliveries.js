import React, { useState, useCallback, useContext, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/declineddeliveries';
import "./datatables.scss";
import Layout from "../../components/HorizontalLayout";


const DeclinedDeliveries = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrors] = useState(false);
  const [individualdel,setIndividualDel] = useState([]);
  const [teamdel,setTeamDel] = useState([]);

  const [message, setMessage] = useState(null);
  let filteredindividualdel;
  let filteredteamdel;


  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://sheet.best/api/sheets/60a3969d-8d9e-4b41-80b0-3f359e8dbb6e/tabs/individualsdeliveries",
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
      .then((individualdel) => {

        filteredindividualdel = individualdel.filter(function (e) {
         return e.status === "denied";
        });
        setIndividualDel(filteredindividualdel);
        setIsLoading(false);
        
      })
      .catch((error) => {
        setErrors(error);
      });
  }, []);

 fetch("https://sheet.best/api/sheets/60a3969d-8d9e-4b41-80b0-3f359e8dbb6e/tabs/leadsdeliveries",
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
 .then((teamdel) => {

  filteredteamdel = teamdel.filter(function (e) {
   return e.status === "denied";
  });
  setTeamDel(filteredteamdel);
  setIsLoading(false);
  
 }) .catch((error) => {
  setErrors(error);
}, []);


 
 
  
   const data = {
      columns: [
        {
          label: "username",
          field: "username",
          sort: "asc",
          width: 100
        },
        {
          label: "fullnames",
          field: "fullnames",
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
          label: "address",
          field: "address",
          sort: "asc",
          width: 100
        },
        {
          label: "omang",
          field: "omang",
          sort: "asc",
          width: 100
        },
        {
          label: "type",
          field: "type",
          sort: "asc",
          width: 100
        },
        {
          label: "location",
          field: "location",
          sort: "asc",
          width: 100
        },
        {
          label: "team_members",
          field: "team_members",
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
          label: "decline_reason",
          field: "decline_reason",
          sort: "asc",
          width: 270
        }
      ],
      
      rows: teamdel
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
              label: "fullnames",
              field: "fullnames",
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
              label: "address",
              field: "address",
              sort: "asc",
              width: 100
            },
            {
              label: "omang",
              field: "omang",
              sort: "asc",
              width: 100
            },
            {
              label: "type",
              field: "type",
              sort: "asc",
              width: 100
            },
            {
              label: "location",
              field: "location",
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
              label: "decline_reason",
              field: "decline_reason",
              sort: "asc",
              width: 270
            }
          ],
          
          rows: individualdel
            };
    return (
      <Layout>
        <div className="page-content">
          <div className="container-fluid">

            <Breadcrumbs title="Delivery Request"  breadcrumbItem="View Withdrawals" />

            <Row>
              <Col className="col-12">
                <Card>
                  <CardBody>
                    <CardTitle>Declined Individual Request </CardTitle>
                   

                    <MDBDataTable responsive bordered data={data2} />


                  </CardBody>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col className="col-12">
                <Card>
                  <CardBody>
                    <CardTitle>Declined Team Request</CardTitle>
                   

                    <MDBDataTable  responsive striped bordered data={data} />

                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
        </Layout>
      );
    };

export default DeclinedDeliveries;
