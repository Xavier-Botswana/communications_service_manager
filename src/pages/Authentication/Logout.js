import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

import { logoutUser } from "../../store/actions";

import firebase from "../../firebase";

const Logout = (props) => {
  useEffect(() => {
    //props.logoutUser(props.history);
    firebase.logout();
  });

  return <></>;
};

export default withRouter(Logout);
