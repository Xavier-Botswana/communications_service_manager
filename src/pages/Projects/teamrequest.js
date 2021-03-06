import React, { useState, useCallback, useContext, useEffect } from 'react'

import firebase from '../../firebase'

import { AuthContext } from '../../AuthProvider'

import { Link } from 'react-router-dom'
import { Container, Row, Col, Input, Badge } from 'reactstrap'

import Layout from '../../components/HorizontalLayout'

import AdminLayout from '../../components/AdminLayout'
import FinanceLayout from '../../components/AdminLayout'

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb'

//Import Card
import CardShop from '../Ecommerce/CardShop'
import FirebaseLoader from '../../components/Loader/FirebaseLoader'

import Individualreq from '../../components/Common/Individualreq'
import Teamcrumb from '../../components/Common/Teamreq'

const TeamDeliveries = (props) => {
  const baseurl = `https://us-central1-gov-communications.cloudfunctions.net/app`
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setErrors] = useState(false)
  const [enquiries, setEnquiries] = useState([])
  const [message, setMessage] = useState(null)
  const [userDetails, setUserDetails] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    fetch(`${baseurl}/api/enquiries`)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw Error('Error fetching data.')
        }
      })
      .then((res) => {
        const email = firebase.auth.currentUser.email

        //
        fetch(`${baseurl}/api/user/${email}`)
          .then((response) => response.json())
          .then((response) => {
            const userDetails = response.data
            setUserDetails(userDetails)
            // console.log(userDetails)
            let pendingEnquiries = res.filter((item) => {
              return (
                item.status === 'Revisit' &&
                item.ministryCode === userDetails.ministryCode
              )
            })
            setEnquiries(pendingEnquiries)
            setIsLoading(false)
            if (enquiries.length === 0) {
              setMessage('No results to show.')
            }
            //////////////////////////////
          })
          .catch((error) => {
            setErrors(error)
          })
      })
      .catch((error) => {
        setErrors(error)
      })
  }, [])

  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Teamcrumb
            title="Revisit Enquiries"
            breadcrumbItem="Pending Requests"
          />

          {/* <Breadcrumbs title="Logged Enquiries" /> */}
          {/**
           <Row className="mb-2">
            <Col sm="4">
              <div className="search-box mr-2 mb-2 d-inline-block">
                <div className="position-relative">
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                  />
                  <i className="bx bx-search-alt search-icon"></i>
                </div>
              </div>
            </Col>
            <Col sm="8">
              <div className="text-sm-right"></div>
            </Col>
          </Row>
           */}

          <Row>
            {enquiries.map((item, key) => (
              <CardShop
                enquiry={item}
                userDetails={userDetails}
                enquiries={enquiries}
                setEnquiries={setEnquiries}
                key={'_shop_' + key}
              />
            ))}
          </Row>
          {isLoading ? (
            <Row>
              <Col xs="12">
                <div className="text-center my-3">
                  <Link to="#" className="text-success">
                    <i className="bx bx-loader bx-spin font-size-18 align-middle mr-2"></i>{' '}
                    Load more{' '}
                  </Link>
                </div>
              </Col>
            </Row>
          ) : null}

          {message ? (
            <Row>
              <Col xs="12">
                <div style={{ color: '#a6b0cf' }} className="text-center my-3">
                  {message}{' '}
                </div>
              </Col>
            </Row>
          ) : null}
        </Container>
      </div>
    </Layout>
  )
}

export default TeamDeliveries
