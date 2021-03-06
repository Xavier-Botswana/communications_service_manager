import React from 'react';
import { Link } from "react-router-dom";
import { Row, Col, BreadcrumbItem } from "reactstrap";

const Breadcrumb = (props) => {
  return (
     <Row>
                    <Col xs="12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <h4 className="mb-0 font-size-18">{props.title}</h4>
                            <div className="page-title-right">
                             <ol className="breadcrumb m-0">
                                     
                                    <BreadcrumbItem active>
                                        <Link to="/declineddeliveries">{props.breadcrumbItem}</Link>
                                    </BreadcrumbItem>
                            </ol>
                            </div>
                        </div>
                    </Col>
                </Row>
  );
}

export default Breadcrumb;