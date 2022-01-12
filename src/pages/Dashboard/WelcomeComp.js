import React, { useState, useContext } from 'react'
import { AuthContext } from '../../AuthProvider'
import { Row, Col, Card, CardBody } from 'reactstrap'
import { Link } from 'react-router-dom'

import avatar1 from '../../assets/images/profile.png'
import profileImg from '../../assets/images/profile-img.png'

const WelcomeComp = (props) => {
  const { currentUser } = useContext(AuthContext)
  const { userDetails } = props

  return (
    <React.Fragment>
      <Card className="overflow-hidden">
        <div className="bg-soft-primary">
          <Row>
            <Col xs="7">
              <div className="text-primary p-3">
                <h5 className="text-primary">Welcome Back !</h5>
                <p>AG Nutrition Dashboard</p>
              </div>
            </Col>
            <Col xs="5" className="align-self-end">
              <img src={profileImg} alt="" className="img-fluid" />
            </Col>
          </Row>
        </div>
        <CardBody className="pt-0">
          <Row>
            <Col sm="6">
              <div className="avatar-md profile-user-wid mb-4">
                <img
                  src={avatar1}
                  alt=""
                  className="img-thumbnail rounded-circle"
                />
              </div>
              <h5 className="font-size-15 text-truncate">
                {currentUser.email}
              </h5>
              <p className="text-muted mb-0 text-truncate">
                {userDetails.userType}
              </p>
            </Col>

            <Col sm="6">
              <div className="pt-4">
                <Row>
                  <Col xs="6">
                    {/* <h5 className="font-size-15">125</h5>
                    <p className="text-muted mb-0">Leads</p> */}
                    <Link
                      to=""
                      className="btn btn-primary waves-effect waves-light btn-sm"
                    >
                      View Profile <i className="mdi mdi-arrow-right ml-1"></i>
                    </Link>
                  </Col>
                  <Col xs="6">
                    <h5 className="font-size-15">{}</h5>
                    <p className="text-muted mb-0">System Users</p>
                  </Col>
                </Row>
                <div className="mt-4"></div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}
export default WelcomeComp
