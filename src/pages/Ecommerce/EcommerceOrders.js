import React, { useState, useCallback, useContext, useEffect } from 'react'

import firebase from '../../firebase'

import { AuthContext } from '../../AuthProvider'

import { Link } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Input,
  Button,
  Card,
  CardBody,
  Table,
  Label,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledTooltip,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap'

import Layout from '../../components/HorizontalLayout'

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb'

import img4 from '../../assets/images/product/img-4.png'
import img7 from '../../assets/images/product/img-7.png'
import SinglePayment from './SinglePayment'

const EcommerceOrders = (props) => {
  const baseurl = `https://us-central1-gov-communications.cloudfunctions.net/app`
  const [modal, setmodal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setErrors] = useState(false)
  const [withdrawal, setWithdrawal] = useState([])
  const [message, setMessage] = useState('')
  const [deliveryStatuses, setDeliveryStatuses] = useState([])
  const [userDetails, setUserDetails] = useState([])

  useEffect(() => {
    setIsLoading(true)
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
            setUserDetails(userDetails)
            // console.log(userDetails)

            let filteredStatuses = statuses.filter((item) => {
              return item.department === userDetails.ministryCode
            })
            // console.log(filteredStatuses)
            setDeliveryStatuses(filteredStatuses)
            setIsLoading(false)
            if (filteredStatuses.length === 0) {
              setMessage('No results to show')
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

  const Orders = [
    {
      id: 'customCheck2',
      orderId: '#SK2540',
      billingName: 'Neal Matthews',
      Date: '07 Oct, 2019',
      total: '$400',
      badgeclass: 'success',
      paymentStatus: 'Paid',
      methodIcon: 'fa-cc-mastercard',
      paymentMethod: 'Mastercard',
    },
    {
      id: 'customCheck3',
      orderId: '#SK2541',
      billingName: 'Jamal Burnett',
      Date: '07 Oct, 2019',
      total: '$380',
      badgeclass: 'danger',
      paymentStatus: 'Chargeback',
      methodIcon: 'fa-cc-visa',
      paymentMethod: 'Visa',
    },
    {
      id: 'customCheck4',
      orderId: '#SK2542',
      billingName: 'Juan Mitchell',
      Date: '06 Oct, 2019',
      total: '$384',
      badgeclass: 'success',
      paymentStatus: 'Paid',
      methodIcon: 'fa-cc-paypal',
      paymentMethod: 'Paypal',
    },
    {
      id: 'customCheck5',
      orderId: '#SK2543',
      billingName: 'Barry Dick',
      Date: '05 Oct, 2019',
      total: '$412',
      badgeclass: 'success',
      paymentStatus: 'Paid',
      methodIcon: 'fa-cc-mastercard',
      paymentMethod: 'Mastercard',
    },
    {
      id: 'customCheck6',
      orderId: '#SK2544',
      billingName: 'Ronald Taylor',
      Date: '04 Oct, 2019',
      total: '$404',
      badgeclass: 'warning',
      paymentStatus: 'Refund',
      methodIcon: 'fa-cc-visa',
      paymentMethod: 'Visa',
    },
    {
      id: 'customCheck7',
      orderId: '#SK2545',
      billingName: 'Jacob Hunter',
      Date: '04 Oct, 2019',
      total: '$392',
      badgeclass: 'success',
      paymentStatus: 'Paid',
      methodIcon: 'fa-cc-paypal',
      paymentMethod: 'Paypal',
    },
    {
      id: 'customCheck8',
      orderId: '#SK2546',
      billingName: 'William Cruz',
      Date: '03 Oct, 2019',
      total: '$374',
      badgeclass: 'success',
      paymentStatus: 'Paid',
      methodIcon: 'fas fa-money-bill-alt',
      paymentMethod: 'COD',
    },
    {
      id: 'customCheck9',
      orderId: '#SK2547',
      billingName: 'Dustin Moser',
      Date: '02 Oct, 2019',
      total: '$350',
      badgeclass: 'success',
      paymentStatus: 'Paid',
      methodIcon: 'fa-cc-paypal',
      paymentMethod: 'Mastercard',
    },
    {
      id: 'customCheck10',
      orderId: '#SK2548',
      billingName: 'Clark Benson',
      Date: '01 Oct, 2019',
      total: '$345',
      badgeclass: 'warning',
      paymentStatus: 'Refund',
      methodIcon: 'fa-cc-paypal',
      paymentMethod: 'Visa',
    },
  ]

  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Delivery Status" />

          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
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

                  <div className="table-responsive">
                    <Table className="table table-centered table-nowrap">
                      <thead className="thead-light">
                        <tr>
                          <th>Date</th>
                          <th>Recipient</th>
                          <th>Status</th>
                          <th>Message</th>
                        </tr>
                      </thead>
                      <tbody>
                        {deliveryStatuses.map((item, key) => (
                          <SinglePayment
                            key={key}
                            deliveryStatus={item}
                            withdrawals={withdrawal}
                            setWithdrawal={setWithdrawal}
                          />
                        ))}
                      </tbody>
                    </Table>
                  </div>
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
                        <div
                          style={{ color: '#a6b0cf' }}
                          className="text-center my-3"
                        >
                          {message}{' '}
                        </div>
                      </Col>
                    </Row>
                  ) : null}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  )
}

export default EcommerceOrders
