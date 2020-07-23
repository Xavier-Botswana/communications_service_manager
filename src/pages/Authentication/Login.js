import React, { useState, useCallback, useContext } from "react";

import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap";

// Redux
import { connect } from "react-redux";
import { withRouter, Link, Redirect } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// actions
import { loginUser, apiError } from "../../store/actions";

import { AuthContext } from "../../AuthProvider";

// import images
import profile from "../../assets/images/profile-img.png";
import logo from "../../assets/images/logo1.png";

import firebase from "../../firebase";

const Login = (props) => {
  const { currentUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    try {
      await firebase.login(email, password);
      props.history.replace("/");
    } catch (error) {
      alert(error.message);
    }
  }

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-soft-primary">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>Sign in to AG Nutrtion.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-5">
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-6">
                        <span className="">
                          <img
                            src={logo}
                            alt="Logo"
                            className="AG Logo"
                            height="40"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <AvForm
                      className="form-horizontal"
                      onSubmit={(e) => e.preventDefault() && false}
                    >
                      {props.error && props.error ? (
                        <Alert color="danger">{props.error}</Alert>
                      ) : null}

                      <div className="form-group">
                        <AvField
                          name="email"
                          label="Email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <AvField
                          name="password"
                          label="Password"
                          type="password"
                          required
                          placeholder="Enter Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>

                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customControlInline"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customControlInline"
                        >
                          Remember me
                        </label>
                      </div>

                      <div className="mt-3">
                        <button
                          className="btn btn-primary btn-block waves-effect waves-light"
                          type="submit"
                          onClick={login}
                        >
                          Log In
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <Link to="/forgot-password" className="text-muted">
                          <i className="mdi mdi-lock mr-1"></i> Forgot your
                          password?
                        </Link>
                      </div>
                    </AvForm>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Don't have an account ?{" "}
                  <Link to="#" className="font-weight-medium text-primary">
                    {" "}
                    Contact Your Administrator{" "}
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} AG Nutrition Dashboard. Crafted
                  with by Xavier Africa
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

const mapStatetoProps = (state) => {
  const { error } = state.Login;
  return { error };
};

export default withRouter(Login);
