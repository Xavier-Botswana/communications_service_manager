import React, { useState } from "react";
import { Link } from "react-router-dom";
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
} from "reactstrap";
import { AvForm, AvField, AvInput } from "availity-reactstrap-validation";
import Select from "react-select";
import Dropzone from "react-dropzone";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import firebase from "../../firebase";
import FirebaseLoader from "../../components/Loader/FirebaseLoader";
import SuccessMessage from "../../components/Alert-Popup/SuccessMessage";

const EcommerceAddProduct = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [imageURL, setImageURL] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isProcessSuccessful, setIsProcessSuccessful] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (
      firstName === "" ||
      lastName === "" ||
      userType === "" ||
      phoneNumber === "" ||
      email === ""
    ) {
      setIsLoading(false);
    }

    // Firebase auth to save email and password:
    firebase.auth
      .createUserWithEmailAndPassword(email, "password123")
      .then(() => {
        console.log("Added user auth details.");

        // Update displayName
        firebase.auth.currentUser
          .updateProfile({
            displayName: `${firstName} ${lastName}`,
          })
          .then(() => {
            console.log("Updated user auth details.");
          })
          .catch((error) => {
            console.log(error);
          });

        // Firestore function to save user details:
        firebase.db
          .collection("users")
          .doc(email)
          .set({
            name: `${firstName} ${lastName}`,
            phoneNumber: phoneNumber,
            userType: userType,
            imageURL: imageURL,
          })
          .then(() => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });

        setIsLoading(false);
        setIsProcessSuccessful(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "firstName") {
      setFirstName(value);
    } else if (name === "lastName") {
      setLastName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "userType") {
      setUserType(value);
    } else if (name === "phoneNumber") {
      setPhoneNumber(value);
    }
  };

  //////////////////////////  Profile Image  //////////////////////////////

  const [selectedFiles, setselectedFiles] = useState([]);

  function handleAcceptedFiles(files) {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );

    setselectedFiles(files);
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
  ///////////////////////////////////////////////////////

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Add Users" breadcrumbItem="Add Users" />

          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <CardTitle>User Information</CardTitle>

                  <CardSubtitle className="mb-3">
                    Fill in all information below
                  </CardSubtitle>

                  <AvForm
                    className="needs-validation"
                    method="post"
                    id="user-add-form"
                    onSubmit={(event) => {
                      handleSubmit(event);
                    }}
                  >
                    <Row>
                      <Col sm="6">
                        <FormGroup>
                          <Label htmlFor="productname">First Name</Label>
                          <AvField
                            validate={{ required: { value: true } }}
                            errorMessage="First name is required"
                            id="fname"
                            name="firstName"
                            type="text"
                            className="form-control"
                            onChange={(event) => onChangeHandler(event)}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor="manufacturername">Last Name</Label>
                          <AvField
                            validate={{ required: { value: true } }}
                            errorMessage="Last name is required"
                            id="lname"
                            name="lastName"
                            type="text"
                            className="form-control"
                            onChange={(event) => onChangeHandler(event)}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor="manufacturerbrand">
                            Email Address
                          </Label>
                          <AvField
                            validate={{ required: { value: true } }}
                            errorMessage="Email is required"
                            id="email"
                            name="email"
                            type="text"
                            className="form-control"
                            onChange={(event) => onChangeHandler(event)}
                          />
                        </FormGroup>
                      </Col>

                      <Col sm="6">
                        <FormGroup>
                          <Label className="control-label">User Type</Label>
                          <AvField
                            validate={{ required: { value: true } }}
                            errorMessage="Select a user type"
                            type="select"
                            id="utype"
                            name="userType"
                            onChange={(event) => onChangeHandler(event)}
                            className="form-control select2"
                          >
                            <option value="">Selet user type...</option>
                            <option value="admin">Admin</option>
                            <option value="finance">Finance</option>
                          </AvField>
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor="manufacturerbrand">
                            Phone Number
                          </Label>
                          <AvField
                            validate={{ required: { value: true } }}
                            errorMessage="Phone number is required"
                            id="pnumber"
                            name="phoneNumber"
                            type="number"
                            className="form-control"
                            onChange={(event) => onChangeHandler(event)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    {isLoading ? <FirebaseLoader /> : null}

                    {isProcessSuccessful ? (
                      <SuccessMessage
                        message={`User ${firstName} ${lastName} successfully added as ${userType}.`}
                      />
                    ) : null}

                    <Card>
                      <CardBody>
                        <CardTitle className="mb-3">
                          User Profile Images
                        </CardTitle>
                        <Form>
                          <Dropzone
                            onDrop={(acceptedFiles) => {
                              handleAcceptedFiles(acceptedFiles);
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
                                    <h4>Drop files here or click to upload.</h4>
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
                                  key={i + "-file"}
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
                              );
                            })}
                          </div>
                        </Form>
                      </CardBody>
                    </Card>

                    <FormGroup className="mb-0">
                      <div>
                        <Button type="submit" color="primary" className="mr-1">
                          Submit
                        </Button>{" "}
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
    </React.Fragment>
  );
};

export default EcommerceAddProduct;
