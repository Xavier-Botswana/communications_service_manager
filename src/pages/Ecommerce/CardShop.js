import React, { useState, useContext } from 'react'
import { AuthContext } from '../../AuthProvider'
import firebase from '../../firebase'
import { Link } from 'react-router-dom'
import {
  Col,
  Row,
  Badge,
  CardText,
  Input,
  TextArea,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Container,
} from 'reactstrap'
import {
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonDropdown,
} from 'reactstrap'

import sendSMS from '../../sms'

//SweetAlert
import SweetAlert from 'react-bootstrap-sweetalert'

const CardShop = (props) => {
  const baseurl = `https://us-central1-gov-communications.cloudfunctions.net/app`
  const { currentUser } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const { enquiry, enquiries, setEnquiries, userDetails } = props
  const [amount, setAmount] = useState(0)
  const [message, setMessage] = useState('')
  const [reason, setReason] = useState('')

  /**SWEET ALERT */

  const [confirm_both, setConfirm_both] = useState(false)
  const [confirm_both_deny, setConfirm_both_deny] = useState(false)
  const [success_dlg, setSuccess_dlg] = useState(false)
  const [dynamic_title, setDynamic_title] = useState('')
  const [dynamic_description, setDynamic_description] = useState('false')

  const openConfirm = () => {
    setConfirm_both(true)
  }

  const openConfirmDeny = () => {
    setConfirm_both_deny(true)
  }

  const close_dlg = () => {
    setSuccess_dlg(false)
  }

  const confirmAction = () => {
    // Action
    setConfirm_both(false)
    setSuccess_dlg(true)
    setDynamic_title('Enquiry resolved')
    setDynamic_description('Message sent.')
    // Proceed to accept
    handleAccept()
  }

  const cancelAction = () => {
    setConfirm_both(false)
  }

  const confirmActionDeny = () => {
    // Action
    setConfirm_both_deny(false)
    setSuccess_dlg(true)
    setDynamic_title('Success')
    setDynamic_description('Enquiry moved to revisit later.')
    // Proceed to decline
    handleDeny()
  }

  const cancelActionDeny = () => {
    setConfirm_both_deny(false)
  }

  /******************************************************************** */

  let PATCH_URL = `https://sheet.best/api/sheets/60a3969d-8d9e-4b41-80b0-3f359e8dbb6e/tabs/enquiry/${
    enquiry.id - 1
  }`

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget

    if (name === 'message') {
      setMessage(value)
    }
  }

  const handleAccept = () => {
    // Change status
    fetch(`${baseurl}/api/enquiry/${enquiry.id}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 'Resolved',
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        //console.log(data);
        const index = enquiries.indexOf(enquiry)
        if (index > -1) {
          setEnquiries(
            enquiries.filter((item) => {
              return item !== enquiry
            }),
          )
        }
      })
      .catch((error) => {
        // console.log(error);
      })

    // const message = `Dear ${enquiry.Username}, your enquiry request has been approved. You will receive your payment in the next 3 working days.`
    sendSMS(`+${enquiry.phoneNumber}`, message, userDetails.ministryCode)
    firebase.logAction(
      currentUser.email,
      `Resolved enquiry for oomang ID ${enquiry.id_Number}`,
    )
    setMessage('')
  }

  const handleDeny = () => {
    // Change status to declined
    fetch(`${baseurl}/api/enquiry/${enquiry.id}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 'Revisit',
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        //  console.log(data);
        const index = enquiries.indexOf(enquiry)
        if (index > -1) {
          setEnquiries(
            enquiries.filter((item) => {
              return item !== enquiry
            }),
          )
        }
      })
      .catch((error) => {
        //  console.log(error);
      })

    firebase.logAction(
      currentUser.email,
      `Revisit enquiry from ${enquiry.id_Number}`,
    )
  }

  return (
    <React.Fragment>
      <Col xl="6" sm="6">
        <Card>
          <Row>
            <Col lg={12}>
              <Card color="black" className="text-black">
                <CardBody>
                  <CardTitle className="mb-4 text-black">
                    <i className="mdi mdi-alert-circle-outline mr-3"></i>
                    ID: {enquiry.id}
                  </CardTitle>
                  <CardText> ID Number: {enquiry.id_Number}</CardText>
                  <CardText>Phone: {enquiry.phoneNumber}</CardText>
                  <CardText>Enquiry: {enquiry.enquiry}</CardText>
                  <CardText>
                    <Button color="dark" className="btn btn-link waves-effect">
                      <a href={enquiry.fileLinks} download target="_blank">
                        <i className="bx bx-file-blank"> </i> View Attached
                        Documents
                      </a>
                    </Button>
                  </CardText>

                  <textarea
                    onChange={onChangeHandler}
                    value={message}
                    className="form-control"
                    name="message"
                    id="example-textarea"
                    rows="4"
                    placeholder="Enter Response..."
                    required
                  ></textarea>

                  <CardBody>
                    <div className="button-items">
                      <Button
                        onClick={openConfirm}
                        color="success"
                        className="btn btn-success waves-effect waves-light"
                      >
                        Send Response
                      </Button>

                      <Button
                        style={{ marginLeft: '15px' }}
                        onClick={openConfirmDeny}
                        color="primary"
                        className="mr-1"
                      >
                        Revisit Later
                      </Button>
                    </div>
                  </CardBody>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Card>
      </Col>
      {confirm_both ? (
        <SweetAlert
          title="Are you sure?"
          warning
          showCancel
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          onConfirm={confirmAction}
          onCancel={cancelAction}
        >
          Send message to user?
        </SweetAlert>
      ) : null}

      {confirm_both_deny ? (
        <SweetAlert
          title="Are you sure?"
          warning
          showCancel
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          onConfirm={confirmActionDeny}
          onCancel={cancelActionDeny}
        >
          Revisit enquiry later?
        </SweetAlert>
      ) : null}

      {success_dlg ? (
        <SweetAlert success title={dynamic_title} onConfirm={close_dlg}>
          {dynamic_description}
        </SweetAlert>
      ) : null}
    </React.Fragment>
  )
}

export default CardShop
