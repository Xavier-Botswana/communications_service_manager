import React, { useState, useCallback, useContext, useEffect } from 'react'

import { AuthContext } from '../../AuthProvider'

import { Link } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Label,
} from 'reactstrap'
import { AvForm, AvField, AvInput } from 'availity-reactstrap-validation'
import Select from 'react-select'
import Dropzone from 'react-dropzone'

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb'

import Layout from '../../components/HorizontalLayout'

import AdminLayout from '../../components/AdminLayout'
import FinanceLayout from '../../components/AdminLayout'

import firebase from '../../firebase'
import FirebaseLoader from '../../components/Loader/FirebaseLoader'
import SuccessMessage from '../../components/Alert-Popup/SuccessMessage'

import sendSMS from '../../sms'

const EcommerceAddProduct = (props) => {
  const baseurl = `https://us-central1-gov-communications.cloudfunctions.net/app`
  const { currentUser } = useContext(AuthContext)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [type, setUserType] = useState('')

  const [imageURL, setImageURL] = useState('')

  const [message, setMessage] = useState('')
  const [phoneNumbers, setPhoneNumbers] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const [isProcessSuccessful, setIsProcessSuccessful] = useState(false)

  const [userDetails, setUserDetails] = useState(null)

  useEffect(() => {
    const email = firebase.auth.currentUser.email

    //
    fetch(`${baseurl}/api/user/${email}`)
      .then((response) => response.json())
      .then((response) => {
        const userDetails = response.data

        console.log(userDetails)
        setUserDetails(userDetails)

        //////////////////////////////
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsLoading(true)

    let numbersArr = phoneNumbers.split(',')
    // console.log(numbersArr)

    // console.log(`${phoneNumbers} ${message}`)

    for (let i = 0; i < numbersArr.length; i++) {
      let phone = `+267${numbersArr[i]}`

      sendSMS(phone, message, userDetails.ministryCode)
      firebase.logAction(currentUser.email, `Sent out bulk message.`)
      setMessage('')
      setPhoneNumbers('')
    }

    setIsLoading(false)
  }

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget

    if (name === 'phoneNumbers') {
      setPhoneNumbers(value)
    }
    if (name === 'message') {
      setMessage(value)
    }
  }

  //////////////////////////  Profile Image  //////////////////////////////

  const [selectedFiles, setselectedFiles] = useState([])

  function handleAcceptedFiles(files) {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      }),
    )

    setselectedFiles(files)
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
  }
  ///////////////////////////////////////////////////////

  return (
    <Layout>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Bulk Communication" breadcrumbItem="Add Users" />

          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <AvForm
                    className="needs-validation"
                    method="post"
                    id="user-add-form"
                    onSubmit={(event) => {
                      handleSubmit(event)
                    }}
                  >
                    <Row>
                      <Col sm="12">
                        <FormGroup>
                          <Label htmlFor="manufacturerbrand">
                            Phone Numbers:
                          </Label>
                          <AvField
                            value={phoneNumbers}
                            errorMessage="Phone numbers required"
                            id="pnumber"
                            name="phoneNumbers"
                            type="text"
                            className="form-control"
                            onChange={onChangeHandler}
                          />
                        </FormGroup>

                        <Card>
                          <CardBody>
                            <CardTitle className="mb-3">
                              Or upload csv file containing phone numbers:
                            </CardTitle>

                            <Dropzone
                              onDrop={(acceptedFiles) => {
                                handleAcceptedFiles(acceptedFiles)
                              }}
                            >
                              {({ getRootProps, getInputProps }) => (
                                <div className="dropzone">
                                  <div
                                    className="dz-message needsclick"
                                    {...getRootProps()}
                                  >
                                    <input {...getInputProps()} />
                                    <div className="dz-message needsclick">
                                      <div className="mb-3">
                                        <i className="display-4 text-muted bx bxs-cloud-upload"></i>
                                      </div>
                                      <h4>
                                        Drop file here or click to upload.
                                      </h4>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Dropzone>
                            <div
                              className="dropzone-previews mt-3"
                              id="file-previews"
                            >
                              {selectedFiles.map((f, i) => {
                                return (
                                  <Card
                                    className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                    key={i + '-file'}
                                  >
                                    <div className="p-2">
                                      <Row className="align-items-center">
                                        <Col className="col-auto">
                                          <img
                                            data-dz-thumbnail=""
                                            height="80"
                                            className="avatar-sm rounded bg-light"
                                            alt={f.name}
                                            src={f.preview}
                                          />
                                        </Col>
                                        <Col>
                                          <Link
                                            to="#"
                                            className="text-muted font-weight-bold"
                                          >
                                            {f.name}
                                          </Link>
                                          <p className="mb-0">
                                            <strong>{f.formattedSize}</strong>
                                          </p>
                                        </Col>
                                      </Row>
                                    </div>
                                  </Card>
                                )
                              })}
                            </div>
                          </CardBody>
                        </Card>

                        <FormGroup>
                          <Label className="control-label">Message:</Label>
                          <textarea
                            onChange={onChangeHandler}
                            value={message}
                            className="form-control"
                            name="message"
                            id="example-textarea"
                            rows="7"
                            placeholder="Enter Message..."
                            required
                          ></textarea>
                        </FormGroup>
                      </Col>
                    </Row>

                    {isLoading ? <FirebaseLoader /> : null}

                    {isProcessSuccessful ? (
                      <SuccessMessage message="User successfully added" />
                    ) : null}

                    <FormGroup className="mb-0">
                      <div>
                        <Button type="submit" color="primary" className="mr-1">
                          Submit
                        </Button>{' '}
                        <Button type="reset" color="secondary">
                          Cancel
                        </Button>
                      </div>
                    </FormGroup>
                  </AvForm>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  )
}

export default EcommerceAddProduct
